import React, { useEffect, useRef, useState, useCallback } from "react";
import { ArrowLeft, Camera, RefreshCw, Trash2, Video, VideoOff, Sparkles, ShieldCheck, AlertCircle, MousePointer, Hand } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

interface TrailPoint {
  x: number;
  y: number;
  handIndex: number;
  time: number;
  hue: number;
}

export default function GestureCanvasPage() {
  const navigate = useNavigate();

  // Canvas & Video Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // App & Camera States
  const [cameraState, setCameraState] = useState<"idle" | "requesting" | "active" | "denied" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [handsTracked, setHandsTracked] = useState<number>(0);
  const [showVideoPreview, setShowVideoPreview] = useState<boolean>(true);
  const [isMouseDrawing, setIsMouseDrawing] = useState<boolean>(false);

  // MediaPipe & Animation Refs
  const handLandmarkerRef = useRef<HandLandmarker | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const trailPointsRef = useRef<TrailPoint[]>([]);
  const lastPointPerHandRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const activeFingertipsRef = useRef<{ x: number; y: number; handIndex: number }[]>([]);
  const isComponentMountedRef = useRef<boolean>(true);

  // Simulated Demo Animation for Fallback / Idle Preview
  const demoAngleRef = useRef<number>(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    isComponentMountedRef.current = true;

    return () => {
      isComponentMountedRef.current = false;
      stopCameraAndVision();
    };
  }, []);

  // Handle Resize for Full Resolution Canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvasRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width * dpr;
        canvasRef.current.height = rect.height * dpr;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Stop camera stream & landmarker instance
  const stopCameraAndVision = () => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }

    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    if (handLandmarkerRef.current) {
      try {
        handLandmarkerRef.current.close();
      } catch {
        // Ignore closing errors
      }
      handLandmarkerRef.current = null;
    }
  };

  // User explicitly clicks "Enable camera →"
  const startCamera = async () => {
    setCameraState("requesting");
    setErrorMessage("");

    try {
      // 1. Request Webcam Access
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (!isComponentMountedRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      // 2. Initialize MediaPipe Vision Tasks
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      if (!isComponentMountedRef.current) return;

      const landmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numHands: 2,
      });

      if (!isComponentMountedRef.current) {
        landmarker.close();
        return;
      }

      handLandmarkerRef.current = landmarker;
      setCameraState("active");
    } catch (err: any) {
      console.error("Camera or MediaPipe initialization failed:", err);
      if (!isComponentMountedRef.current) return;

      stopCameraAndVision();

      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setCameraState("denied");
      } else {
        setCameraState("error");
        setErrorMessage(
          err.message || "Unable to initialize camera feed. Please check camera availability."
        );
      }
    }
  };

  // Main Render & Detection Loop
  useEffect(() => {
    let lastVideoTime = -1;

    const renderLoop = () => {
      if (!isComponentMountedRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const video = videoRef.current;

      if (canvas && ctx) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = canvas.width;
        const height = canvas.height;
        const now = Date.now();

        // 1. Process Hand Landmarker if Camera Active
        if (
          cameraState === "active" &&
          handLandmarkerRef.current &&
          video &&
          video.readyState >= 2
        ) {
          if (video.currentTime !== lastVideoTime) {
            lastVideoTime = video.currentTime;
            try {
              const results = handLandmarkerRef.current.detectForVideo(video, performance.now());
              activeFingertipsRef.current = [];

              if (results.landmarks && results.landmarks.length > 0) {
                setHandsTracked(results.landmarks.length);

                results.landmarks.forEach((handLandmarks, handIdx) => {
                  // Index fingertip landmark is 8
                  const tip = handLandmarks[8];
                  if (tip) {
                    // Mirror X coordinate for selfie view
                    const canvasX = (1 - tip.x) * width;
                    const canvasY = tip.y * height;

                    activeFingertipsRef.current.push({
                      x: canvasX,
                      y: canvasY,
                      handIndex: handIdx,
                    });

                    // Distance throttling (> 3px movement)
                    const lastPos = lastPointPerHandRef.current.get(handIdx);
                    let dist = 999;
                    if (lastPos) {
                      const dx = canvasX - lastPos.x;
                      const dy = canvasY - lastPos.y;
                      dist = Math.sqrt(dx * dx + dy * dy);
                    }

                    if (dist > 3 * dpr) {
                      const currentHue = (now / 15) % 360;
                      trailPointsRef.current.push({
                        x: canvasX,
                        y: canvasY,
                        handIndex: handIdx,
                        time: now,
                        hue: currentHue,
                      });
                      lastPointPerHandRef.current.set(handIdx, { x: canvasX, y: canvasY });
                    }
                  }
                });
              } else {
                setHandsTracked(0);
              }
            } catch (e) {
              console.warn("HandLandmarker detection frame skip:", e);
            }
          }
        } else if (cameraState === "idle" || cameraState === "denied" || cameraState === "error") {
          // Automatic ambient floating light demo loop if camera is not active and no user drawing
          demoAngleRef.current += 0.02;
          const cx = width / 2;
          const cy = height / 2;
          const radiusX = Math.min(width, height) * 0.28;
          const radiusY = Math.min(width, height) * 0.18;

          // Figure-8 infinity path
          const demoX = cx + Math.sin(demoAngleRef.current) * radiusX;
          const demoY = cy + Math.sin(demoAngleRef.current * 2) * 0.5 * radiusY;

          // Add automated demo points smoothly
          const demoHue = (now / 20) % 360;
          trailPointsRef.current.push({
            x: demoX,
            y: demoY,
            handIndex: 99,
            time: now,
            hue: demoHue,
          });
        }

        // 2. Clear Canvas & Prune Stale Points (>2000ms old)
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);

        const TRAIL_LIFETIME = 2000; // 2 seconds fade out
        trailPointsRef.current = trailPointsRef.current.filter(
          (p) => now - p.time <= TRAIL_LIFETIME
        );

        // 3. Draw Trail Light Paths grouped by handIndex
        const groupedMap = new Map<number, TrailPoint[]>();
        trailPointsRef.current.forEach((p) => {
          if (!groupedMap.has(p.handIndex)) groupedMap.set(p.handIndex, []);
          groupedMap.get(p.handIndex)!.push(p);
        });

        groupedMap.forEach((points) => {
          if (points.length < 2) return;

          for (let i = 1; i < points.length; i++) {
            const p1 = points[i - 1];
            const p2 = points[i];

            const age = now - p2.time;
            const alpha = Math.max(0, 1 - age / TRAIL_LIFETIME);
            const thickness = (4 + alpha * 10) * dpr;

            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            // Outer Glow Layer
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineWidth = thickness * 2.2;
            ctx.strokeStyle = `hsla(${p2.hue}, 100%, 65%, ${alpha * 0.25})`;
            ctx.stroke();

            // Core Bright Stroke
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineWidth = thickness;
            ctx.strokeStyle = `hsla(${p2.hue}, 100%, 75%, ${alpha * 0.85})`;
            ctx.stroke();

            // Bright Center Sparkle Line
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineWidth = thickness * 0.35;
            ctx.strokeStyle = `hsla(${p2.hue}, 30%, 98%, ${alpha * 0.95})`;
            ctx.stroke();
          }
        });

        // 4. Draw Active Fingertip Markers for tracked hands
        if (cameraState === "active" && activeFingertipsRef.current.length > 0) {
          activeFingertipsRef.current.forEach((tip) => {
            const hue = (now / 15) % 360;
            const pulse = 1 + Math.sin(now / 120) * 0.15;

            // Outer pulsing target ring
            ctx.beginPath();
            ctx.arc(tip.x, tip.y, 16 * dpr * pulse, 0, Math.PI * 2);
            ctx.lineWidth = 2 * dpr;
            ctx.strokeStyle = `hsla(${hue}, 100%, 70%, 0.9)`;
            ctx.stroke();

            // Inner solid core dot
            ctx.beginPath();
            ctx.arc(tip.x, tip.y, 6 * dpr, 0, Math.PI * 2);
            ctx.fillStyle = `#FFFFFF`;
            ctx.fill();
          });
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [cameraState]);

  // Mouse / Touch Drawing Handlers on Canvas
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsMouseDrawing(true);
    addPointerPoint(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isMouseDrawing || e.pointerType === "touch" || e.buttons === 1) {
      addPointerPoint(e);
    }
  };

  const handlePointerUp = () => {
    setIsMouseDrawing(false);
  };

  const addPointerPoint = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const x = (e.clientX - rect.left) * dpr;
    const y = (e.clientY - rect.top) * dpr;

    const now = Date.now();
    const currentHue = (now / 15) % 360;

    trailPointsRef.current.push({
      x,
      y,
      handIndex: 88, // Mouse/touch identifier
      time: now,
      hue: currentHue,
    });
  };

  const clearCanvas = () => {
    trailPointsRef.current = [];
    lastPointPerHandRef.current.clear();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#000000] text-[#F4F1EA] flex flex-col relative select-none overflow-hidden font-sans"
    >
      {/* TOP NAVIGATION BAR */}
      <header className="relative z-30 w-full px-5 sm:px-8 py-5 flex items-center justify-between border-b border-[#1A1A1A] bg-[#000000]/80 backdrop-blur-md">
        <button
          onClick={() => navigate("/")}
          className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded py-1 px-2"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>← BACK TO PORTFOLIO</span>
        </button>

        <div className="flex items-center space-x-3 text-xs text-neutral-400">
          <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
            EXPERIMENT / GESTURE CANVAS
          </span>
        </div>
      </header>

      {/* CONTENT & CANVAS WRAPPER */}
      <div className="relative flex-1 flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full z-10 space-y-6">
        
        {/* EXPLANATION HEADER (BEFORE CAMERA ACTIVATES OR ALWAYS VISIBLE AT TOP) */}
        <div className="text-center max-w-2xl space-y-3 pt-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#111111] border border-[#222222] text-xs text-neutral-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Browser-Based Motion Art</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-white tracking-tight">
            Gesture Canvas
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
            Move your hand in front of your camera and draw with light. Runs entirely in your browser — nothing is recorded or sent anywhere.
          </p>
        </div>

        {/* MAIN INTERACTIVE CANVAS AREA */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[620px] bg-[#050505] rounded-2xl border border-[#222222] overflow-hidden flex items-center justify-center shadow-2xl group">
          
          {/* Main Drawing Canvas */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="w-full h-full object-cover cursor-crosshair touch-none"
          />

          {/* HIDDEN WEBCAM VIDEO ELEMENT (PROCESSED BY MEDIAPIPE) */}
          <video
            ref={videoRef}
            playsInline
            muted
            className="hidden"
          />

          {/* OVERLAY STATE: IDLE (BEFORE CAMERA ACTIVATED) */}
          {cameraState === "idle" && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-6 z-20 transition-all">
              <div className="w-16 h-16 rounded-full bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-300 shadow-xl">
                <Camera className="w-8 h-8" />
              </div>

              <div className="max-w-md space-y-2">
                <h2 className="font-serif text-xl sm:text-2xl text-white font-medium">
                  Ready to Paint with Light?
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300">
                  Click below to enable your camera. You can also click or drag anywhere on the canvas right now to test drawing manually!
                </p>
              </div>

              <button
                type="button"
                onClick={startCamera}
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-white hover:bg-neutral-200 text-black font-medium text-sm rounded-xl shadow-lg hover:scale-105 transition-all cursor-pointer group"
              >
                <span>Enable camera →</span>
              </button>

              <div className="flex items-center space-x-2 text-[11px] text-neutral-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Private &amp; Local processing</span>
              </div>
            </div>
          )}

          {/* OVERLAY STATE: REQUESTING / INITIALIZING */}
          {cameraState === "requesting" && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 z-20">
              <RefreshCw className="w-8 h-8 text-purple-400 animate-spin" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-white">Initializing Camera &amp; AI Vision...</p>
                <p className="text-xs text-neutral-400">Loading MediaPipe hand landmarker model...</p>
              </div>
            </div>
          )}

          {/* OVERLAY STATE: GRACEFUL FALLBACK (DENIED / ERROR) */}
          {(cameraState === "denied" || cameraState === "error") && (
            <div className="absolute inset-x-4 top-4 bg-[#111111]/90 border border-amber-500/30 backdrop-blur-md p-4 sm:p-5 rounded-xl z-20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-start space-x-3 text-left">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-white">
                    Camera access needed for this one — no worries if you'd rather skip it!
                  </p>
                  <p className="text-xs text-neutral-400">
                    {errorMessage || "You can still paint with your mouse or finger directly on the canvas below."}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={startCamera}
                  className="px-3.5 py-2 bg-[#222222] hover:bg-[#333333] text-xs font-medium text-white rounded-lg transition-colors cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* ACTIVE STATUS BAR & MINI WEBCAM PREVIEW */}
          {cameraState === "active" && (
            <>
              {/* Top Status Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center space-x-3 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-medium text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>
                  {handsTracked > 0
                    ? `Tracking ${handsTracked} Hand${handsTracked > 1 ? "s" : ""} ✋`
                    : "Wave your hand in front of camera..."}
                </span>
              </div>

              {/* Mini Mirrored Video Overlay (Bottom Right) */}
              {showVideoPreview && (
                <div className="absolute bottom-4 right-4 z-20 w-28 sm:w-36 aspect-video bg-black rounded-lg border border-white/20 overflow-hidden shadow-2xl transition-all">
                  <video
                    ref={(el) => {
                      if (el && videoRef.current && el.srcObject !== videoRef.current.srcObject) {
                        el.srcObject = videoRef.current.srcObject;
                        el.play().catch(() => {});
                      }
                    }}
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                  <div className="absolute bottom-1 left-1.5 text-[9px] font-mono text-white/80 bg-black/60 px-1 rounded">
                    Selfie Feed
                  </div>
                </div>
              )}
            </>
          )}

          {/* TOUCH / MOUSE DRAWING INSTRUCTION BADGE AT BOTTOM LEFT */}
          <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] text-neutral-300">
            <MousePointer className="w-3.5 h-3.5 text-purple-400" />
            <span>Click &amp; drag anywhere to paint manually</span>
          </div>
        </div>

        {/* BOTTOM ACTION CONTROLS */}
        <div className="flex flex-wrap items-center justify-between gap-4 w-full pt-2">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={clearCanvas}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-[#111111] hover:bg-[#1C1C1C] text-neutral-300 hover:text-white border border-[#2A2A2A] rounded-xl text-xs font-medium transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>Clear Canvas</span>
            </button>

            {cameraState === "active" && (
              <button
                type="button"
                onClick={() => setShowVideoPreview((prev) => !prev)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-[#111111] hover:bg-[#1C1C1C] text-neutral-300 hover:text-white border border-[#2A2A2A] rounded-xl text-xs font-medium transition-colors cursor-pointer"
              >
                {showVideoPreview ? (
                  <>
                    <VideoOff className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Hide Video Feed</span>
                  </>
                ) : (
                  <>
                    <Video className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Show Video Feed</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="text-xs text-neutral-400 font-mono">
            {cameraState === "active" ? "Trail Lifetime: ~2s • Rainbow Hue Cycle" : "Interactive Light-Painting"}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
