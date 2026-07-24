import { useState, useEffect, useRef } from 'react';
import { ThemeProvider, CssBaseline, Container, Stack, Typography, Box, Button, Tooltip, GlobalStyles } from '@mui/material';
import { darkTheme, lightTheme } from './theme';
import GlassCard from './components/GlassCard';
//import { Link as RouterLink } from 'react-router-dom';
import { Link as MUILink } from '@mui/material';


const SECTIONS = [
  { id: 'home', label: '01. Home' },
  { id: 'about', label: '02. About' },
  { id: 'experiences', label: '03. Experiences' },
  { id: 'projects', label: '04. Projects' },
  { id: 'competitions', label: '05. Competitions' },
  { id: 'skills', label: '06. Skills' },
  { id: 'contact', label: '07. Contact' },
  {id: 'art', label: '08. Art '},
  {id: 'notes', label: '09. Notes '}
];

const SKILLS = ['React', 'SQL', 'Node.js', ' HTML/CSS', 'Python', 'JavaScript', 'Java', 'C' , 'Neo4j', 'OCaml'];

// Professional Scroll Animation Wrapper
function FadeInSection({ children, delay = '0s' }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.unobserve(domRef.current);
      }
    }, { threshold: 0.15 });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => { if (domRef.current) observer.disconnect(); };
  }, []);

  return (
    <Box
      ref={domRef}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`,
        width: '100%'
      }}
    >
      {children}
    </Box>
  );
}

export default function App() {
  const imageStyle = {
  width: '100%',
  height: '300px', // Set your desired fixed height
  objectFit: 'cover', // This is the secret sauce: it crops to fill, keeping ratio
  borderRadius: '8px',
};
  const [highlightButton, setHighlightButton] = useState(false);
  // 'closed', 'loading', 'open'
  const [beyondStatus, setBeyondStatus] = useState('closed');
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? darkTheme : lightTheme;

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('preesha.dige@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

const handleScroll = (id) => {
  if (id === 'art' || id === 'notes') {
    // Scroll to the visual break button instead of the section
    document.getElementById('beyond-terminal-trigger')?.scrollIntoView({ behavior: 'smooth' });
    
    // Add a temporary highlight effect
    setHighlightButton(true);
    setTimeout(() => setHighlightButton(false), 2000); // Glow for 2 seconds
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
};

  const handleBeyondClick = () => {
  if (beyondStatus === 'closed') {
    setBeyondStatus('loading');
    setTimeout(() => setBeyondStatus('open'), 1200); // 1.2s delay
  } else {
    setBeyondStatus('closed');
  }
};

  // Cursor & Scroll Listeners
  useEffect(() => {
    const moveCursor = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    
    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'button' || e.target.closest('button')) {
        setIsHovered(true);
      }
    };
    const handleMouseOut = () => setIsHovered(false);

    const handleWindowScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(totalScroll / windowHeight);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('scroll', handleWindowScroll);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', handleWindowScroll);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <GlobalStyles styles={{
        '@keyframes floatUp': {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      }} />

      {/* Reading Progress Bar */}
      <Box sx={{
        position: 'fixed', top: 0, left: 0, height: '3px',
        width: `${scrollProgress * 100}%`,
        backgroundColor: '#FFDD87',
        zIndex: 100000,
        transition: 'width 0.1s ease-out'
      }} />


      {/* Theme Toggle */}
      {/*}
      <Box sx={{ position: 'fixed', top: '24px', right: { xs: '16px', md: '32px' }, zIndex: 1000 }}>
        <Button
          onClick={() => setIsDark(!isDark)}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            color: isDark ? 'white' : 'black',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50px',
            px: 2, 
            py: 0.5,
            fontSize: '0.7rem',
            fontFamily: 'monospace',
            textTransform: 'lowercase',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            '&::before': {
              content: '""', position: 'absolute', top: 0, left: '-150%', width: '100%', height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              transform: 'skewX(-20deg)', transition: 'all 0.6s ease',
            },
            '&:hover': { background: 'rgba(255, 255, 255, 0.15)', '&::before': { left: '150%' } }
          }}
        >
          {isDark ? 'sys: light' : 'sys: dark'}
        </Button>
      </Box>*/}

      {/* The Photographic Parallax Background */}
<Box 
  sx={{ 
    minHeight: '100vh', position: 'relative', zIndex: 0,
    // Deep slate for dark, soft light-grey for light mode
    backgroundColor: isDark ? '#11161d' : '#f8f9fa', 
    
    '&::before': {
      content: '""', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundImage: isDark ? 'url(./bluebg.jpg)' : 'url(./bluebg2.jpg)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      // Subtle opacity for texture, not a focal point
      opacity: isDark ? 0.25 : 0.08, 
      zIndex: -1,
      backgroundBlendMode: isDark ? 'overlay' : 'multiply',
    },
    '&::after': {
      content: '""', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: isDark 
        ? 'radial-gradient(circle at 50% 0%, rgba(30, 41, 59, 0.2) 0%, rgba(6, 48, 67, 0.98) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 244, 248, 0.9) 100%)',
      zIndex: -1,
    }
  }}
>
      

        {/* Floating Top Nav (with Glare Buttons) */}
        <Box 
          sx={{ 
            position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)', 
            zIndex: 100, display: 'flex', gap: { xs: 0.5, md: 1 }, p: 0.5,
            flexWrap: 'nowrap', whiteSpace: 'nowrap', 
            background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(16px)',
            borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)', maxWidth: '95vw',
          }}
        >
          {SECTIONS.map((section) => (
            <Button
              key={section.id}
              onClick={() => handleScroll(section.id)}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                color: 'white', borderRadius: '50px', px: { xs: 1, md: 3 }, py: 0.5, 
                fontSize: { xs: '0.65rem', md: '0.8rem' }, textTransform: 'lowercase',
                transition: 'all 0.3s ease',
                '&::before': {
                  content: '""', position: 'absolute', top: 0, left: '-150%', width: '100%', height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                  transform: 'skewX(-20deg)', transition: 'all 0.6s ease',
                },
                '&:hover': { background: 'rgba(255,255,255,0.15)', '&::before': { left: '150%' } }
              }}
            >
              {section.id}
            </Button>
          ))}
        </Box>

        {/* Main Content Area */}
        <Container maxWidth="xl" sx={{ pl: { xs: 4, md: 6 }, pr: { xs: 4, md: 6 }, pt: 16, pb: 6 }}>
          <Stack spacing={16}>
            
            {/* 1. HOME */}
            <Box component="section" id="home" sx={{ scrollMarginTop: '100px' }}>
              <Typography variant="overline" sx={{ display: 'block', mb: 2, fontFamily: 'monospace', color: 'secondary.main' }}>
                01. Home
              </Typography>
              <FadeInSection>
                <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="h1" sx={{ fontSize: { xs: '4rem', md: '6rem' }, fontWeight: 800, color: 'text.primary', lineHeight: 1 }}>
                    Hi, I'm<br />
                    <Box component="span" sx={{ color: 'warning.main', textShadow: isDark ? '0 0 30px rgba(255, 221, 135, 0.5)' : 'none' }}>
                      Preesha.
                    </Box>
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 4, maxWidth: '600px', color: 'text.secondary', fontWeight: 300, textShadow: isDark ? '0 2px 4px rgba(0,0,0,0.5)' : 'none' }}>
                    2nd-year computer science student exploring agentic AI, sustainability, productivity and healthtech.
                  </Typography>
                </Box>
              </FadeInSection>
            </Box>

            {/* 2. ABOUT */}
            <Box component="section" id="about" sx={{ scrollMarginTop: '100px' }}>
              <Typography variant="overline" sx={{ display: 'block', mb: 2, fontFamily: 'monospace', color: 'secondary.main' }}>
                02. About 
              </Typography>
              <FadeInSection>
                <Box sx={{ maxWidth: '1450px' }}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 2fr' }, gap: 6, alignItems: 'center' }}>
                    <Box 
                      sx={{ 
                        width: '400px', height: '400px', borderRadius: '24px', flexShrink: 0,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)',
                        imageOrientation: 'from-image', backgroundImage: 'url(./profile.png)',
                      }} 
                    />
                    <Box>
                      <Typography variant="h4" sx={{ color: 'primary.main', mb: 3, fontWeight: 700 }}>A bit more about me</Typography>
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-line', fontSize: '1.2rem', lineHeight: 1.8, color: 'text.primary', textShadow: isDark ? '0 1px 3px rgba(0,0,0,0.6)' : 'none' }}>
                         Currently:{'\n'}
                        - Interning at TechWolf as an AI Engineer{'\n'}
                        - Attending YC Startup School 2026 in San Francisco {'\n'}
                        {'\n'}
                      
                        I am a second-year Computer Science student at the University of Cambridge.
                        {'\n'}

I love the process (and challenge) of taking a raw idea and turning it into something tangible. While my recent work has focused on prototyping and experimentation, I am actively looking to take on harder challenges and bridge the gap between a prototype and deployment.


                        {'\n'}{'\n'}

                       

{'\n'}
                        
                        </Typography>

                    </Box>
                  </Box>
                </Box>
              </FadeInSection>

              <Box sx={{ mt: 6, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line', fontSize: '1.2rem', lineHeight: 1.8, color: 'text.primary', textShadow: isDark ? '0 1px 3px rgba(0,0,0,0.6)' : 'none' }}>
                    Outside of tech: {'\n'}
                        - I love making {' '}

                        
                        <MUILink
                           onClick={() => handleScroll('art')}
                           sx={{
                             color: 'warning.darker',
                             fontWeight: 600,
                             textDecoration: 'underline',
                             textDecorationColor: 'rgba(154, 241, 254, 0.4)',
                             textUnderlineOffset: '3px',
                             cursor: 'pointer',
                             transition: 'color 0.25s ease, text-decoration-color 0.25s ease, text-shadow 0.25s ease',
                             '&:hover': {
                               color: 'warning.main',
                               textDecorationColor: 'warning.main',
                               textShadow: '0 0 12px rgba(88, 68, 15, 0.6).6)',
                             },
                           }}
                         >
                        art</MUILink>
                        
                        
                        
                        
                        . {' '}I also enjoy reading, sports, and martial arts.
{'\n'}

                        - I am also the Women@CL Tech Chair at the University of Cambridge, where I help organise per-term technical talk events with industry/academic and student/researcher speakers.
                         {'\n'}


                         <Typography variant="body1" sx={{ whiteSpace: 'pre-line', fontSize: '1.2rem', lineHeight: 1.8, color: '#4b91a3', textShadow: isDark ? '0 1px 3px rgba(0,0,0,0.6)' : 'none' }}>
                         (If you are interested in collaborating or speaking at one of our events, please feel free to    
                        {' '}
                         <MUILink
                           onClick={() => handleScroll('contact')}
                           sx={{
                             color: 'warning.darker',
                             fontWeight: 600,
                             textDecoration: 'underline',
                             textDecorationColor: 'rgba(154, 241, 254, 0.4)',
                             textUnderlineOffset: '3px',
                             cursor: 'pointer',
                             transition: 'color 0.25s ease, text-decoration-color 0.25s ease, text-shadow 0.25s ease',
                             '&:hover': {
                               color: 'warning.main',
                               textDecorationColor: 'warning.main',
                               textShadow: '0 0 12px rgba(88, 68, 15, 0.6).6)',
                             },
                           }}
                         >
                             reach out!
                         </MUILink>

                          😊)
                          </Typography>
                </Typography>
              </Box>
            </Box>

            {/* 3. EXPERIENCES */}
            <Box component="section" id="experiences" sx={{ scrollMarginTop: '100px' }}>
              <Typography variant="overline" sx={{ display: 'block', mb: 2, fontFamily: 'monospace', color: 'secondary.main' }}>
                03. Experiences
              </Typography>
              <FadeInSection>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 6, textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : 'none' }}>Experiences</Typography>
                  <GlassCard>
                    <Box sx={{ pl: 3, borderLeft: '2px solid', borderColor: 'secondary.main', position: 'relative' }}>
                      <Box sx={{ mb: 6, position: 'relative' }}>
                        <Box sx={{ position: 'absolute', left: '-31px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: theme.palette.warning.main, boxShadow: '0 0 10px rgba(255, 221, 135, 0.5)' }} />
                        <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 600 }}>AI Engineer Intern @ TechWolf</Typography>
                        <Typography variant="caption" sx={{ color: 'secondary.main', display: 'block', mb: 2, fontSize: '0.9rem' }}>July 2026 - Present</Typography>
                        <Typography variant="body1" sx={{ color: 'text.primary' }}></Typography>
                      </Box>
                      <Box sx={{ mb: 6, position: 'relative' }}>
                        <Box sx={{ position: 'absolute', left: '-31px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: theme.palette.warning.main, boxShadow: '0 0 10px rgba(255, 221, 135, 0.5)' }} />
                        <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 600 }}>FTTP Programme @ Jane Street</Typography>
                        <Typography variant="caption" sx={{ color: 'secondary.main', display: 'block', mb: 2, fontSize: '0.9rem' }}>May 2025</Typography>
                        <Typography variant="body1" sx={{ color: 'text.primary' }}> • Developed understanding of trading, real-world risk management, and quantitative problem solving.</Typography>
                      </Box>
                      <Box sx={{ mb: 6, position: 'relative' }}>
                        <Box sx={{ position: 'absolute', left: '-31px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: theme.palette.warning.main, boxShadow: '0 0 10px rgba(255, 221, 135, 0.5)' }} />
                        <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 600 }}>Data Science Insight @ Netacea</Typography>
                        <Typography variant="caption" sx={{ color: 'secondary.main', display: 'block', mb: 2, fontSize: '0.9rem' }}>June 2023</Typography>
                        <Typography variant="body1" sx={{ color: 'text.primary', whiteSpace: 'pre-line' }}>
                          
                          • Explored the applications of ML algorithms (e.g. binary classification and dimensionality reduction) to
enhance data modelling.
{'\n'}
{'\n'}
• Gained insights into applying theoretical CS concepts, such as Fourier analysis, to partition international
data for time zone analysis. </Typography>
                      </Box>

                    </Box>
                  </GlassCard>
                </Box>
              </FadeInSection>
            </Box>

            {/* 4. PROJECTS */}
            <Box component="section" id="projects" sx={{ scrollMarginTop: '100px' }}>
              <Typography variant="overline" sx={{ display: 'block', mb: 2, fontFamily: 'monospace', color: 'secondary.main' }}>
                04. Projects
              </Typography>
              <FadeInSection>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 6, textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : 'none' }}>Projects</Typography>
                  <Box sx={{ display: 'flex', overflowX: 'auto', gap: 4, pb: 4, px: 1, scrollSnapType: 'x mandatory', '&::-webkit-scrollbar': { display: 'none' } }}>
                    {[
                      { techstack: ['Flask', 'Python', 'React', 'JavaScript'], button: '', date: '2026', title: 'Intuitive Business Data – Cloud Resource Management & VPL System [Calero]', img: '', 
                        description: '• Co-developed a cloud management platform featuring a VPL for policy automation and an AI-driven resource optimisation engine.\n \n • Built an analytics dashboard and integrated AI-assisted ticket recommendations and chat interface to improve cloud monitoring and user queries.' },
                      { techstack: ['React', 'React Flow', 'Spring Boot', 'Neo4j', 'REST APIs', 'Java', 'JavaScript', 'HTML/CSS'], button: 'In Progress', date: '2025', title: 'Graph Visualisation Application [Experimental/WIP]', img: '', 
                        description: '• Experimenting with Neo4j to build a full-stack web tool that visually maps and organizes concepts.' },
                      { techstack: [], button: '', date: '2026', title: 'Product & Strategy - SheStarts 2.0 Venture Sprint', img: '', description: '• Selected as 1 of 62 participants for a high-intensity 3-day sprint. \n \n • Collaborated cross-functionally to create an initial concept and GTM strategy for a two-sided social coordination platform, and pitched to an expert panel.'},
                    
                      { techstack: ['React', 'JavaScript', 'Tailwind CSS'], button: 'This site' , date: '2026', title: 'Personal Website', img: '', description: 'Designed and developed a responsive personal website.' }
                    ].map((item, index) => (
                      <Box key={index} sx={{ minWidth: { xs: '85vw', md: '450px' }, scrollSnapAlign: 'start' }}>
                        <GlassCard>
                          <Box sx={{ height: '50px', backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '12px', mb: 3 }} />
                          <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 700, mb: 1 }}>{item.title}</Typography>
                          <Typography variant="caption" sx={{ color: 'secondary.main', display: 'block', mb: 2 }}>{item.date}</Typography>
                          <Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: 'text.primary', opacity: 0.8, mb: 3 }}>{item.description}</Typography>
            
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, paddingBottom: 2 }}>
                    {item.techstack.map((skill) => (
                      <Box key={skill} sx={{ px: 1, py: 0.25, borderRadius: '8px', background: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(16px)', border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.45)', color: 'text.primary', fontWeight: 500, fontSize: '0.75rem' }}>
                        {skill}
                      </Box>
                    ))}
                  </Box>
                          
                          <Button variant="outlined" sx={{ position: 'relative', overflow: 'hidden', color: '#FFDD87', borderColor: 'rgba(255, 221, 135, 0.4)', borderRadius: '20px', transition: 'all 0.3s ease', '&::before': { content: '""', position: 'absolute', top: 0, left: '-150%', width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', transform: 'skewX(-20deg)', transition: 'all 0.6s ease' }, '&:hover': { borderColor: '#FFDD87', background: 'rgba(255, 221, 135, 0.1)', '&::before': { left: '150%' } }}}>{item.button}</Button>
                        
                        
                        </GlassCard>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </FadeInSection>
            </Box>

            {/* 5. COMPETITIONS */}
            <Box component="section" id="competitions" sx={{ scrollMarginTop: '100px' }}>
              <Typography variant="overline" sx={{ display: 'block', mb: 2, fontFamily: 'monospace', color: 'secondary.main' }}>
                05. Competitions
              </Typography>
              <FadeInSection>
                <Box sx={{ maxWidth: '800px' }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 6, textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : 'none' }}>Competitions & Challenges</Typography>
                  <Stack spacing={4}>
                    <GlassCard>
                      <Stack spacing={4}>
                        <Box sx={{ borderBottom: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', pb: 2 }}>
                          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>2nd Place - TheTechBros X InditexTech Hackathon </Typography>
                          <Typography variant="body2" sx={{ color: 'secondary.main' }}>TheTechBros X InditexTech Hackathon • 2026</Typography>
                          <Typography variant="body2" sx={{ color: 'text.primary', mt: 1 }}>Prototyped 'Retail Therapist', an AI fashion tech web app using Inditex’s tools, to detect wardrobe gaps, helping
users make intentional, value-driven style decisions based on user's mood, personal tastes and inspirations. </Typography>
                        </Box>
                      </Stack>
                    </GlassCard>

                    <GlassCard>
                      <Stack spacing={4}>
                        <Box sx={{ borderBottom: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', pb: 2 }}>
                          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>CamHack</Typography>
                          <Typography variant="body2" sx={{ color: 'secondary.main' }}>CamHack: 48-hour hackathon  at the University of Cambridge • 2025</Typography>
                          <Typography variant="body2" sx={{ color: 'text.primary', mt: 1, whiteSpace: 'pre-line' }}> Prototyped a chaotic alarm clock app in a 48-hour hackathon themed “Unintended Behaviour” and selected as one of the top 10. {'\n' } Implemented key interaction logic and presented to 250+ participants. </Typography>
                        </Box>
                      </Stack>
                    </GlassCard>

                    <GlassCard>
                      <Stack spacing={4}>
                        <Box sx={{ borderBottom: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', pb: 2 }}>
                          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>National Finalist - PA Consulting Raspberry Pi Competition </Typography>
                          <Typography variant="body2" sx={{ color: 'secondary.main' }}>PA Consulting X Raspberry Pi Competition • 2023 </Typography>
                          <Typography variant="body2" sx={{ color: 'text.primary', mt: 1, whiteSpace: 'pre-line' }}> Co-developed a smart meter software to gamify home energy saving and presented the concept to multiple businesses.
 {'\n' }  </Typography>
                        </Box>
                      </Stack>
                    </GlassCard>


                    <GlassCard>
                      <Stack spacing={4}>
                        <Box sx={{ borderBottom: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', pb: 2 }}>
                          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>Regional Winner - Shell Bright Ideas Challenge </Typography>
                          <Typography variant="body2" sx={{ color: 'secondary.main' }}>Shell UK • 2020</Typography>
                          <Typography variant="body2" sx={{ color: 'text.primary', mt: 1, whiteSpace: 'pre-line' }}> Designed a system to convert sound energy into usable stores; awarded Northwest winner and a £2,500 prize.</Typography>
                        </Box>
                      </Stack>
                    </GlassCard>

                  </Stack>
                </Box>
              </FadeInSection>
            </Box>

            {/* 6. SKILLS */}
            <Box component="section" id="skills" sx={{ scrollMarginTop: '100px' }}>
              <Typography variant="overline" sx={{ display: 'block', mb: 2, fontFamily: 'monospace', color: 'secondary.main' }}>
                06. Skills
              </Typography>
              <FadeInSection>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mb: 6, textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : 'none' }}>Technologies I've worked with:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {SKILLS.map((skill) => (
                      <Box key={skill} sx={{ px: 3, py: 1.5, borderRadius: '30px', background: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(16px)', border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.8)', color: 'text.primary', fontWeight: 500 }}>
                        {skill}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </FadeInSection>
            </Box>

            {/* 7. CONTACT */}
            <Box component="section" id="contact" sx={{ scrollMarginTop: '100px' }}>
              <Typography variant="overline" sx={{ display: 'block', mb: 2, fontFamily: 'monospace', color: 'secondary.main' }}>
                07. Contact
              </Typography>
              <FadeInSection>
                <Box sx={{ pb: 12, textAlign: 'left' }}>
                  <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 800, mb: 3, textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : 'none' }}>Whether you have an interesting opportunity, want to share ideas or just want to say hello - would love to connect! 😊</Typography> 
                  <Button component="a" href="mailto:preesha.dige@gmail.com" variant="contained" sx={{ position: 'relative', overflow: 'hidden', background: 'rgba(255, 221, 135, 0.15)', color: '#FFDD87', border: '1px solid #FFDD87', borderRadius: '30px', px: 6, py: 2, fontWeight: 700, fontSize: '1.1rem', backdropFilter: 'blur(10px)', boxShadow: '0 0 15px rgba(255, 221, 135, 0.2)', transition: 'all 0.3s', '&::before': { content: '""', position: 'absolute', top: 0, left: '-150%', width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)', transform: 'skewX(-20deg)', transition: 'all 0.6s ease' }, '&:hover': { background: '#FFDD87', color: '#023047', border: '1px solid #FFDD87', boxShadow: '0 0 20px rgba(255, 221, 135, 0.6)', transform: 'translateY(-3px)', '&::before': { left: '150%' } }}}>
                    Get In Touch
                  </Button>
                </Box>
              </FadeInSection>
            </Box>


            {/* --- VISUAL BREAK: INTERACTIVE TERMINAL BRIDGE --- */}
            <Box sx={{ my: 12, textAlign: 'center', position: 'relative' }}>
              <Box sx={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: isDark ? 'linear-gradient(90deg, transparent, rgba(255, 221, 135, 0.3), transparent)' : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.2), transparent)', zIndex: 1 }} />
              
              <Button 
                id="beyond-terminal-trigger" 
                onClick={handleBeyondClick}
                disabled={beyondStatus === 'loading'}
                sx={{ 
                  position: 'relative', zIndex: 2, p: 3, borderRadius: '12px', textTransform: 'none',
                  background: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)', 
                  backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)',
                  '&:hover': { background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
                  boxShadow: highlightButton ? '0 0 20px rgba(255, 221, 135, 0.6)' : 'none',
    transition: 'all 0.5s ease'
  }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'warning.main', fontWeight: 600, fontSize: '1.1rem', mb: 0.5 }}>
                    <span style={{ color: '#4b91a3' }}>~/about-me</span> $ cd ./beyond-the-terminal
                  </Typography>

                  <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', fontStyle: 'italic', mb: 2, maxWidth: '400px' }}>
                    Software is just one medium. Here is how I explore creativity and process ideas off-screen.
                  </Typography>

                  <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                    {beyondStatus === 'loading' ? '> Loading...' : 
                     beyondStatus === 'open' ? '> Click here to close' : 
                     '> Click to explore art and notes...'}
                  </Typography>
                </Box>
              </Button>
            </Box>

{/* 8. ART & 9. NOTES (Only shown if showBeyond is true) */}
            {beyondStatus == 'open' && (
              <>

            {/* 8. ART */}
            <Box component="section" id="art" sx={{ scrollMarginTop: '100px' }}>
              <Typography variant="overline" sx={{ display: 'block', mb: 2, fontFamily: 'monospace', color: 'secondary.main' }}>
                08. Art
              </Typography>
              <FadeInSection>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 6, textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : 'none' }}>Gallery</Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
                   {/* Art Item 1 */}
<GlassCard>
  <Box 
    component="img" 
    src="./art4.jpeg" 
    alt="Artwork Title"
    sx={{ 
      width: '100%', 
      height: 'auto', 
      objectFit: 'cover', 
      borderRadius: '12px', 
      mb: 3, 
      display: 'block', // Ensures the image behaves as a block element
      border: isDark ? '1px dashed rgba(255,255,255,0.2)' : '1px dashed rgba(0,0,0,0.2)',
      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
    }} 
  />
  
  <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 700, mb: 1 }}>
    15/01/2025
  </Typography>
  <Typography variant="caption" sx={{ color: 'secondary.main', display: 'block' }}>
    Acrylic on Black Paper  
  </Typography>
</GlassCard>

                    {/* Art Item 2 */}
                    <GlassCard>
  <Box 
    component="img" 
    src="./art2.jpeg" 
    alt="Artwork Title"
    sx={{ 
      width: '100%', 
      height: 'auto', 
      objectFit: 'cover', 
      borderRadius: '12px', 
      mb: 3, 
      display: 'block', // Ensures the image behaves as a block element
      border: isDark ? '1px dashed rgba(255,255,255,0.2)' : '1px dashed rgba(0,0,0,0.2)',
      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
    }} 
  />
                      <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 700, mb: 1 }}>30/06/2025</Typography>
                      <Typography variant="caption" sx={{ color: 'secondary.main', display: 'block' }}>Acrylic on Canvas</Typography>
                    </GlassCard>

                     {/* Art Item 3 */}
                     <GlassCard>
  <Box 
    component="img" 
    src="./art1.jpeg" 
    alt="Artwork Title"
    sx={{ 
      width: '100%', 
      height: 'auto', 
      objectFit: 'cover', 
      borderRadius: '12px', 
      mb: 3, 
      display: 'block', // Ensures the image behaves as a block element
      border: isDark ? '1px dashed rgba(255,255,255,0.2)' : '1px dashed rgba(0,0,0,0.2)',
      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
    }} 
  />
                      <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 700, mb: 1 }}>21/06/2026</Typography>
                      <Typography variant="caption" sx={{ color: 'secondary.main', display: 'block' }}>Acrylic on Canvas</Typography>
                    </GlassCard>

                  </Box>
                </Box>
<Typography 
  variant="body2" 
  sx={{ 
    color: 'text.secondary', 
    mt: 4, 
    textAlign: 'center', 
    opacity: 0.7 
  }}
>
  Will add more soon.
</Typography>

              </FadeInSection>
            </Box>

            {/* 9. NOTES */}
            <Box component="section" id="notes" sx={{ scrollMarginTop: '100px', mt: 16 }}>
              <Typography variant="overline" sx={{ display: 'block', mb: 2, fontFamily: 'monospace', color: 'secondary.main' }}>
                09. Notes
              </Typography>
              <FadeInSection>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 6, textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : 'none' }}>Notes & Thoughts</Typography>
                  
                  <Stack spacing={4}>
                    <GlassCard>
                      <Box sx={{ borderLeft: '2px solid', borderColor: 'warning.main', pl: 3, py: 1 }}>
                        <Typography variant="caption" sx={{ color: 'secondary.main', display: 'block', mb: 2, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                          Coming Soon
                        </Typography>
                        <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 700, mb: 2 }}>
                          A Digital Snapshot
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.primary', opacity: 0.8, whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                          I am currently setting up this space to share short notes, brain dumps, and things I learn along the way. {'\n\n'}
                          Expect unstructured thoughts on navigating the different experiences, and everything I am soaking up at YC Startup School this week. Check back soon!
                        </Typography>
                      </Box>
                    </GlassCard>
                  </Stack>

                </Box>
              </FadeInSection>
            </Box>

</>
            )}





          </Stack>





          {/* Anchor Footer */}
          <Box component="footer" sx={{ mt: 16, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
              © {new Date().getFullYear()} Preesha. 
            </Typography>
            <Box sx={{ display: 'flex', gap: 4 }}>
              {[
                { label: 'GitHub', href: 'https://github.com/P-D101' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/preesha-d' },
              ].map(({ label, href }) => (
                <MUILink
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body2"
                  sx={{ color: 'text.secondary', cursor: 'pointer', textDecoration: 'none', '&:hover': { color: 'text.primary' } }}
                >
                  {label}
                </MUILink>
              ))}
              <Tooltip title={emailCopied ? 'Copied!' : 'preesha.dige@gmail.com'} open={emailCopied || undefined}>
                <MUILink
                  component="button"
                  onClick={copyEmail}
                  variant="body2"
                  sx={{ color: 'text.secondary', cursor: 'pointer', textDecoration: 'none', '&:hover': { color: 'text.primary' } }}
                >
                  {emailCopied ? 'Copied!' : 'Email'}
                </MUILink>
              </Tooltip>
            </Box>
            <Button onClick={() => handleScroll('home')} sx={{ position: 'relative', overflow: 'hidden', color: 'text.secondary', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', px: 3, transition: 'all 0.3s ease', '&::before': { content: '""', position: 'absolute', top: 0, left: '-150%', width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', transform: 'skewX(-20deg)', transition: 'all 0.6s ease' }, '&:hover': { background: 'rgba(255,255,255,0.05)', color: 'text.primary', '&::before': { left: '150%' } } }}>
              Back to Top ↑
            </Button>
          </Box>

        </Container>
      </Box>
    </ThemeProvider>
  );
}