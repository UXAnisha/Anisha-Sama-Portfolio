import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generatePDF() {
  const pdfDoc = await PDFDocument.create();
  
  // Standard letter size: 612 x 792 points
  const page = pdfDoc.addPage([612, 792]);
  const { width, height } = page.getSize();
  
  const fontHelvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontHelveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontHelveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const marginX = 36; // 0.5 inch margin
  let currentY = height - 36;
  const contentWidth = width - marginX * 2;

  // Colors
  const textColor = rgb(0.1, 0.1, 0.1);
  const grayColor = rgb(0.3, 0.3, 0.3);
  const lineColor = rgb(0.7, 0.7, 0.7);

  function drawText(text, x, y, options = {}) {
    page.drawText(text, {
      x,
      y,
      size: options.size || 9.5,
      font: options.font || fontHelvetica,
      color: options.color || textColor,
    });
  }

  function drawLine(y) {
    page.drawLine({
      start: { x: marginX, y },
      end: { x: width - marginX, y },
      thickness: 0.5,
      color: lineColor,
    });
  }

  function wrapText(text, font, fontSize, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine + ' ' + word;
      const width = font.widthOfTextAtSize(testLine, fontSize);
      if (width < maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  // HEADER
  const nameText = 'ANISHA SAMA';
  const nameWidth = fontHelveticaBold.widthOfTextAtSize(nameText, 18);
  drawText(nameText, (width - nameWidth) / 2, currentY, { size: 18, font: fontHelveticaBold });
  currentY -= 14;

  const contactText = 'Chicago, IL  •  LinkedIn  •  anisha.a.sama@gmail.com  •  Portfolio: anishasama.com';
  const contactWidth = fontHelvetica.widthOfTextAtSize(contactText, 8.5);
  drawText(contactText, (width - contactWidth) / 2, currentY, { size: 8.5, font: fontHelvetica, color: grayColor });
  currentY -= 14;

  // SECTION HEADER HELPER
  function addSectionHeader(title) {
    currentY -= 4;
    drawText(title, marginX, currentY, { size: 10, font: fontHelveticaBold });
    currentY -= 3;
    drawLine(currentY);
    currentY -= 11;
  }

  // SUMMARY
  addSectionHeader('SUMMARY');
  const summaryText = 'UX Designer pursuing an M.S. in Human-Computer Interaction at DePaul University, with 2+ years of hands-on experience across the end-to-end design process, from user research and prototyping to applying GenAI in product and interaction design. Comfortable moving between Figma prototyping, user interviews, usability testing, and tree testing, and turning research into wireframes and interaction flows for consumer-facing products. Looking to bring that research-to-design range to a role designing intuitive, industry-leading experiences.';
  
  const summaryLines = wrapText(summaryText, fontHelvetica, 8.5, contentWidth);
  for (const line of summaryLines) {
    drawText(line, marginX, currentY, { size: 8.5, font: fontHelvetica });
    currentY -= 11;
  }

  // EXPERIENCE
  addSectionHeader('EXPERIENCE');

  const jobs = [
    {
      role: 'DePaul University - Graduate Research Assistant - RAISE Lab',
      date: 'Dec 2025 - Present',
      bullets: [
        'Research dark patterns in generative AI systems, examining how LLM interfaces shape user trust, transparency, autonomy, and decision-making for diverse users.',
        'Conduct product audits and literature synthesis across AI tools, translating findings into interaction design recommendations for clearer prompts, refusal patterns, recovery flows, and autonomy safeguards.',
        'Designed scenario-based study materials and supported moderated usability/interview sessions; synthesized findings from 6 participants on confidence, context-window awareness, and recovery behavior.',
        'Managed research operations through Notion task boards, agendas, notes, recruitment materials, and cross-functional coordination with faculty, PhD, and MS researchers.'
      ]
    },
    {
      role: 'Indian National Trust for Art and Cultural Heritage (INTACH) - Visual Communication Designer',
      date: '2022 - 2025',
      bullets: [
        'Led the end-to-end design and launch of a multilingual Bhavnagar heritage website, defining its information architecture, content hierarchy, navigation, and visual design to make Bhavnagar’s cultural history accessible to diverse audiences.',
        'Conducted archival and cultural research and authored articles for Bhavnagar Heritage Magazine, translating complex historical material into clear, engaging stories for a public audience of over 1,400 subscribers.',
        'Developed content strategies for social media and researched and designed heritage education programs for students, transforming cultural research into age-appropriate content and engaging learning experiences.'
      ]
    },
    {
      role: 'The Seven IT Solutions - User Experience Designer',
      date: 'Feb 2021 - Jan 2022',
      bullets: [
        'Designed user flows, wireframes, and interactive prototypes in Figma for client digital products, applying interaction design and user-centered design methods across the end-to-end design process from concept through handoff.',
        'Collaborated with developers and stakeholders to translate business requirements into visual design solutions, iterating on layouts based on usability feedback.'
      ]
    }
  ];

  for (const job of jobs) {
    drawText(job.role, marginX, currentY, { size: 9, font: fontHelveticaBold });
    const dateWidth = fontHelveticaBold.widthOfTextAtSize(job.date, 8.5);
    drawText(job.date, width - marginX - dateWidth, currentY, { size: 8.5, font: fontHelveticaBold });
    currentY -= 11;

    for (const bullet of job.bullets) {
      const bulletLines = wrapText(bullet, fontHelvetica, 8.2, contentWidth - 12);
      drawText('•', marginX + 2, currentY, { size: 8.2, font: fontHelvetica });
      
      for (let i = 0; i < bulletLines.length; i++) {
        drawText(bulletLines[i], marginX + 12, currentY, { size: 8.2, font: fontHelvetica });
        currentY -= 10.2;
      }
    }
    currentY -= 3;
  }

  // SELECTED PROJECTS
  addSectionHeader('SELECTED PROJECTS');

  const projects = [
    {
      title: 'Podify - UX/UI Product Design Case Study',
      date: '2026',
      bullets: [
        'Designed 25+ Figma screens for a music/community product, including onboarding, discovery, dashboard, and content interaction flows using components, variants, and Auto Layout.',
        'Iterated through 3 prototype rounds from 5 user-feedback sessions, improving visual hierarchy, CTA clarity, navigation, and the storytelling arc of the product experience.'
      ]
    },
    {
      title: 'Pineapple - Healthcare Access & Scheduling App',
      date: '2025',
      bullets: [
        'Co-designed a healthcare access and appointment-scheduling experience; created user flows, wireframes, and interactive prototypes for a clearer patient journey.',
        'Compeleted 4 moderated usability tests and identified 12+ friction points, then translated findings into revised screens, clearer labels, and simplified task flows.'
      ]
    },
    {
      title: 'Tech Careers & AI - UX Research Study',
      date: '2026',
      bullets: [
        'Co-conducted observation sessions with 9 participants and interviews with 8 participants to understand how early-career job seekers navigate an AI-disrupted tech job market.',
        'Synthesized findings using the AEIOU framework and affinity diagramming, translating patterns into 2 personas and experience maps representing distinct job-seeker needs, and a priority matrix ranking 8 features by impact and feasibility to guide the design direction.'
      ]
    },
    {
      title: 'TaskLight - AI-Powered Productivity Platform',
      date: '',
      bullets: [
        'Designed a centralized dashboard integrating tasks, deadlines, and messages from Outlook, Teams, Slack, and learning-management systems.',
        'Developed AI-based prioritization to identify urgent action items; translated user needs into sketches, interaction flows, and a high-fidelity Figma prototype.'
      ]
    },
    {
      title: 'Google Maps: Smart Journey Notifications - UX Study',
      date: '2026',
      bullets: [
        'Studied transit scenarios to identify when timely alerts could help users prepare, leave, or adjust their travel plans.',
        'Designed the "Make the Wait Useful" concept, which recommends nearby cafés, restaurants, or stores during transit delays and uses walking distance, remaining wait time, and a return-time buffer to determine whether the stop fits without risking the trip.'
      ]
    }
  ];

  for (const proj of projects) {
    drawText(proj.title, marginX, currentY, { size: 9, font: fontHelveticaBold });
    if (proj.date) {
      const dateWidth = fontHelveticaBold.widthOfTextAtSize(proj.date, 8.5);
      drawText(proj.date, width - marginX - dateWidth, currentY, { size: 8.5, font: fontHelveticaBold });
    }
    currentY -= 11;

    for (const bullet of proj.bullets) {
      const bulletLines = wrapText(bullet, fontHelvetica, 8.2, contentWidth - 12);
      drawText('•', marginX + 2, currentY, { size: 8.2, font: fontHelvetica });
      
      for (let i = 0; i < bulletLines.length; i++) {
        drawText(bulletLines[i], marginX + 12, currentY, { size: 8.2, font: fontHelvetica });
        currentY -= 10.2;
      }
    }
    currentY -= 2;
  }

  // TECHNICAL SKILLS
  addSectionHeader('TECHNICAL SKILLS');

  const skills = [
    { label: 'Design:', value: 'UX Design, Interaction Design, Visual Design, Information Architecture, Wireframing, Prototyping, Design Systems, Accessibility (WCAG), Content Strategy' },
    { label: 'Research:', value: 'User Interviews, Moderated Usability Testing, Think-Aloud Protocol, Tree Testing, Card Sorting, Heuristic Evaluation, Affinity Mapping, Thematic Analysis' },
    { label: 'Tools:', value: 'Figma, FigJam, Miro, Atlas.ti, Qualtrics, Axure RP, Adobe Photoshop, Adobe Illustrator, Notion, Microsoft Teams, HTML/CSS, Generative AI Prototyping Tools' },
    { label: 'Strengths:', value: 'Customer-Centered Storytelling, Design Rationale, Stakeholder Communication, Ambiguity, Responsible AI, Cross-Functional Collaboration' }
  ];

  for (const item of skills) {
    drawText(item.label, marginX, currentY, { size: 8.2, font: fontHelveticaBold });
    const labelWidth = fontHelveticaBold.widthOfTextAtSize(item.label + ' ', 8.2);
    const valueLines = wrapText(item.value, fontHelvetica, 8.2, contentWidth - labelWidth);
    
    drawText(valueLines[0], marginX + labelWidth, currentY, { size: 8.2, font: fontHelvetica });
    currentY -= 10.2;
    for (let i = 1; i < valueLines.length; i++) {
      drawText(valueLines[i], marginX + labelWidth, currentY, { size: 8.2, font: fontHelvetica });
      currentY -= 10.2;
    }
  }

  // EDUCATION
  addSectionHeader('EDUCATION');

  const eduItems = [
    { school: 'M.S Human Computer Interaction - DePaul University', detail: 'GPA: 3.80/4.0 (June 2027)' },
    { school: 'B.E Electronics and Communications Engineering - Gujarat Technological University', detail: 'GPA: 8.0/10.0' }
  ];

  for (const edu of eduItems) {
    drawText(edu.school, marginX, currentY, { size: 8.5, font: fontHelveticaBold });
    const detailWidth = fontHelvetica.widthOfTextAtSize(edu.detail, 8.5);
    drawText(edu.detail, width - marginX - detailWidth, currentY, { size: 8.5, font: fontHelveticaBold });
    currentY -= 11;
  }

  const pdfBytes = await pdfDoc.save();

  fs.writeFileSync(path.join(process.cwd(), 'public', 'resume.pdf'), pdfBytes);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'Anisha_Sama_UX_Resume.pdf'), pdfBytes);
  
  if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
    fs.writeFileSync(path.join(process.cwd(), 'dist', 'resume.pdf'), pdfBytes);
    fs.writeFileSync(path.join(process.cwd(), 'dist', 'Anisha_Sama_UX_Resume.pdf'), pdfBytes);
  }

  console.log('PDF generated successfully!');
}

generatePDF().catch(console.error);
