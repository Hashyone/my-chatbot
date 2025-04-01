import React, { useState } from "react";
import axios from 'axios';
import { useForm } from "@formspree/react";
import { 
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
  styled
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6]
  }
}));

const MessageBubble = styled(Paper)(({ theme, owner }) => ({
  maxWidth: '80%',
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  backgroundColor: owner === 'user' ? theme.palette.primary.main : theme.palette.grey[200],
  color: owner === 'user' ? theme.palette.primary.contrastText : theme.palette.text.primary,
  alignSelf: owner === 'user' ? 'flex-end' : 'flex-start',
  borderRadius: owner === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0'
}));

function App() {
  // State declarations
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isReadMoreVisible, setIsReadMoreVisible] = useState(false);

  // Data
  const grades = [
    {
      name: "RB 1",
      description: "Premium grade coal with high calorific value and low ash content.",
      specs: [
        "Calorific Value (Net Calorific Value, NCV): 6,000 kcal/kg (Minimum 5,850 kcal/kg)",
        "Total Moisture (As Received Basis, ARB): 12.0% max",
        "Volatile Matter (ARB): 22.0% min",
        "Ash Content (ARB): 15.0% max",
        "Sulphur Content (ARB): 1.0% max",
        "Hardgrove Grindability Index (HGI): 45-70",
        "Nominal Topsize: 50 mm",
        "Initial Deformation Temperature (IDT) in a reducing atmosphere: Min 1,250 °C",
        "Calcium Oxide in Ash (dry basis, DB): 12.0% max"
      ],
    },
    
    {
      name: "RB 2",
      description: "Mid-tier coal suitable for industrial applications.",
      specs: [
        "Calorific Value (Net Calorific Value, NCV): 6,000 kcal/kg (Minimum 5,700 kcal/kg)",
        "Total Moisture (As Received Basis, ARB): 13.0% max",
        "Volatile Matter (ARB): 21.0% min",
        "Ash Content (ARB): 17.0% max",
        "Sulphur Content (ARB): 1.0% max",
        "Hardgrove Grindability Index (HGI): 45-70",
        "Nominal Topsize: 50 mm",
        "Initial Deformation Temperature (IDT) in a reducing atmosphere: Min 1,250 °C"
      ],
    },

    {
      name: "RB 3",
      description: "Cost-effective option with good energy performance.",
      specs: [
        "Calorific Value (Net Calorific Value, NCV): 5,500 kcal/kg (Minimum 5,300 kcal/kg)",
        "Total Moisture (As Received Basis, ARB): 14.0% Max",
        "Volatile Matter (ARB): 20.0% Min",
        "Ash Content (ARB): 23.0% Max",
        "Sulphur Content (ARB): 1.0% Max",
        "Hardgrove Grindability Index (HGI): 45-70",
        "Nominal Topsize: 50 mm",
        "Initial Deformation Temperature (IDT) in a reducing atmosphere: Min 1,150 °C"
      ],
    },

  ];

  const services = [
    {
      name: "RB1, RB2 & RB3 Coal Supply",
      description: "Sourcing and supplying high-quality coal with strict specifications.",
    },
    {
      name: "Transportation",
      description: "Moving RB1, RB2, and RB3 coal from the source to the siding.",
    },
    {
      name: "Clewer Siding Loading",
      description: "Managing offloading, tallying, RMT tracking, and weighbridge operations.",
    },
    {
      name: "Railway Services",
      description: "Handling train loading, wagon monitoring, customer updates, and engagements with Transnet Freight Rail (TFR).",
    },
    {
      name: "Port Services",
      description: "Managing cargo receiving, verification, stockpile handling, 24/7 security, forwarding and clearing, terminal handling, and vessel loading.",
    },
  ];

  // Handlers
  const toggleReadMore = () => setIsReadMoreVisible(prev => !prev);
  const toggleServices = () => setIsServicesVisible(prev => !prev);
  const toggleDetails = (name) => setSelectedGrade(selectedGrade === name ? null : name);



  // Configure Axios interceptors for retry logic
  axios.interceptors.response.use(
    response => response,
    error => {
      const config = error.config;
      if (!config || !config.retry) return Promise.reject(error);
  
      // Check if the error is due to timeout
      if (error.code === 'ECONNABORTED') {
        config.__retryCount = (config.__retryCount || 0) + 1;
        
        if (config.__retryCount >= config.retry) {
          return Promise.reject(error);
        }
  
        // Implement exponential backoff
        const retryDelay = config.retryDelay || 1000;
        const backoff = new Promise(resolve => {
          setTimeout(() => {
            console.log(`Retrying... Attempt ${config.__retryCount}/${config.retry}`);
            resolve();
          }, retryDelay * (2 ** config.__retryCount)); // Exponential backoff
        });
  
        return backoff.then(() => axios(config));
      }
  
      return Promise.reject(error);
    }
  );
  
  

// Configure Axios interceptors for retry logic
axios.interceptors.response.use(
  response => response,
  error => {
    const config = error.config;
    if (!config || !config.retry) return Promise.reject(error);

    // Check if the error is due to timeout
    if (error.code === 'ECONNABORTED') {
      config.__retryCount = (config.__retryCount || 0) + 1;
      
      if (config.__retryCount >= config.retry) {
        return Promise.reject(error);
      }

      // Implement exponential backoff
      const retryDelay = config.retryDelay || 1000;
      const backoff = new Promise(resolve => {
        setTimeout(() => {
          console.log(`Retrying... Attempt ${config.__retryCount}/${config.retry}`);
          resolve();
        }, retryDelay * (2 ** config.__retryCount)); // Exponential backoff
      });

      return backoff.then(() => axios(config));
    }

    return Promise.reject(error);
  }
);

// Define your company-specific FAQs
const COMPANY_FAQS = `
  You are a customer support assistant for Blue Germany Holdings (Pty) Ltd. 
  Use the following FAQs to answer customer questions:

  1. What types of coal do you supply?
  At Blue Germany Holdings, we specialize in supplying high-quality coal grades tailored for various industrial and energy applications. Our product range includes RB1, RB2, and RB3 coal, each known for its specific properties and energy output. RB1 is highly sought after for its superior heating value, RB2 offers a balanced option for energy generation, and RB3 is ideal for cost-effective fuel solutions. Our commitment to quality and reliability positions us as a leading coal supplier, ensuring we meet the unique requirements of our clients with consistency and excellence.

  2. How do you ensure the quality of your coal?
  Quality assurance is a cornerstone of Blue Germany Holdings. We implement stringent testing and quality control measures at every stage of the supply chain. This includes thorough sampling and analysis at the source, during transportation, and before delivery to our clients. By adhering to industry standards and best practices, we ensure that our coal consistently meets or exceeds client expectations. Our dedication to maintaining high standards guarantees reliability and customer satisfaction, reinforcing our reputation as a trusted coal supplier in the market.

  3. Can you handle large bulk orders?
  Yes! Blue Germany Holdings specializes in fulfilling large bulk orders to support the operational needs of industries such as energy production, manufacturing, and steel processing. Our robust supply chain and logistics network enable us to deliver significant coal volumes efficiently while maintaining premium quality. We recognize the importance of timely delivery and operational continuity for our clients, making us a dependable partner for businesses requiring bulk coal supplies. You can rely on us for seamless and efficient coal procurement solutions.

  4. What are your shipping options for coal exports?
  We offer a range of flexible shipping options to accommodate the diverse needs of our domestic and international clients. Our logistics team ensures secure and timely transportation through multiple shipping methods. We provide trucking services for direct deliveries, offering quick and reliable transport to your location. Additionally, for larger bulk shipments, we utilize railway transport, which provides a cost-effective and efficient solution for long-distance delivery. Our dedication to prompt and safe shipping makes us a preferred choice for coal exports, ensuring your orders arrive on time and in excellent condition.

  5. How can I get a quote for my needs?
  Obtaining a personalized quote from Blue Germany Holdings is simple and hassle-free. Contact us through our website or give us a call, and our dedicated customer service team will assist you promptly. We will gather all necessary details, including the type of coal, quantity, and delivery specifications, to provide you with accurate information and competitive pricing. Our goal is to offer exceptional service and help you find the ideal coal solution for your business needs.

  If you don't know the answer, respond with: "I'm unable to answer this question. Please contact info@bluegermanyholdings.com"
`;

const handleChatSubmit = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  setMessages(prev => [...prev, { role: "user", content: input }]);
  setIsLoading(true);

  try {
    const apiKey = process.env.REACT_APP_DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error('API key not configured.');
    }

    // Prepare messages with the company-specific FAQs
    const validMessages = [
      { role: "system", content: COMPANY_FAQS },
      { role: "user", content: input }
    ];

    // Configure Axios request with timeout and retry
    const response = await axios.post(
      "https://api.deepseek.com/v1/chat/completions", // Corrected API endpoint
      {
        model: "deepseek-chat",
        messages: validMessages,
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        timeout: 30000, // Increased timeout to 30 seconds
        retry: 3, // Number of retries
        retryDelay: 2000 // Initial retry delay
      }
    );

    const botResponse = response.data.choices[0].message.content;
    setMessages(prev => [...prev, { role: "bot", content: botResponse }]);
    
  } catch (error) {
    console.error('API Error:', error);
    let errorMessage;

    // Handle different error types
    if (error.code === 'ECONNABORTED') {
      errorMessage = `Request timed out after ${error.config.timeout}ms. Please try again later.`;
    } else if (error.response && error.response.status === 422) {
      errorMessage = 'Invalid request format. Please check your input and try again.';
    } else {
      errorMessage = error.response?.data?.error?.message ||
                    error.message ||
                    "Technical difficulty - please try again later";
    }

    setMessages(prev => [...prev, { role: "bot", content: errorMessage }]);
  } finally {
    setIsLoading(false);
    setInput("");
  }
};

// Production considerations:
// 1. Environment variables should be properly secured and not exposed to the client
// 2. Add rate limiting to prevent abuse
// 3. Implement logging for monitoring and debugging
// 4. Consider adding a loading state indicator for better user experience
// 5. Add comprehensive error handling and user feedback mechanisms
  const ContactSection = () => {
    const [formData, setFormData] = useState({
      name: '', surname: '', email: '', phone: '', message: ''
    });
    const [state, handleSubmit] = useForm("xqapdkoj");

    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      await handleSubmit(e);
      if (state.succeeded) {
        setFormData({ name: '', surname: '', email: '', phone: '', message: '' });
      }
    };

    return (
      <Box component="section" py={6} bgcolor="grey.100">
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom align="center">
            Get In Touch
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Interested in our coal products? Contact us for pricing and availability.
          </Typography>
          
          <Box display="flex" justifyContent="center" mb={4}>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => setIsFormVisible(!isFormVisible)}
            >
              {isFormVisible ? "Hide Form" : "Contact Us"}
            </Button>
          </Box>
          
          {isFormVisible && (
            <Box 
              component="form" 
              onSubmit={handleFormSubmit}
              sx={{
                p: 4,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 2
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Surname *"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={state.submitting}
                    endIcon={<SendIcon />}
                  >
                    {state.submitting ? "Sending..." : "Submit"}
                  </Button>
                </Grid>
                {state.errors && (
                  <Grid item xs={12}>
                    <Box color="error.main">
                      {state.errors.map((error) => (
                        <Typography key={error.code}>{error.message}</Typography>
                      ))}
                    </Box>
                  </Grid>
                )}
                {state.succeeded && (
                  <Grid item xs={12}>
                    <Box color="success.main">
                      <Typography>Thanks for your message! We'll contact you soon.</Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </Container>
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Box component="header" py={4} bgcolor="primary.main" color="primary.contrastText">
        <Container>
          <Box display="flex" alignItems="center">
            <Box mr={3}>
              <img 
                src="/Blue Germany Holdings Logo.png" 
                alt="Blue Germany Holdings Logo" 
                style={{ height: 80, width: 'auto' }} 
              />
            </Box>
            <Box>
              <Typography variant="h3" component="h1">
                Blue Germany Holdings (Pty) Ltd
              </Typography>
              <Typography variant="subtitle1">
                Premium Coal Suppliers - Powering Your Industry
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box component="main" flexGrow={1}>
       {/* About & Services */}
<Box py={6} sx={{
  backgroundImage: 'url("/images/hands.jpg")', // Replace with your actual image path
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay to make text readable
    zIndex: 1,
  }
}}>
  <Container sx={{ position: 'relative', zIndex: 2 }}>
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Box mb={4}>
          <Typography variant="h3" gutterBottom sx={{ color: 'white' }}>
            About Blue Germany Holdings (Pty) Ltd
          </Typography>
          <Typography paragraph sx={{ color: 'white' }}>
            Founded in 2021, Blue Germany Holdings (Pty) Ltd is a coal trading company 
            specializing in both local and international markets.
          </Typography>
          <Button 
            variant="contained" 
            onClick={toggleReadMore}
            sx={{ 
              backgroundColor: 'white', 
              color: '#333',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              }
            }}
          >
            {isReadMoreVisible ? "Read Less" : "Read More"}
          </Button>
          {isReadMoreVisible && (
            <Typography paragraph mt={2} sx={{ color: 'white' }}>
              With a strong presence in Witbank/Mpumalanga, we leverage Clewer Siding for 
              efficient rail logistics and operate through Maydon Wharf, Durban, for port 
              handling and exports.
            </Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box>
          <Typography variant="h3" gutterBottom sx={{ color: 'white' }}>
            Our Services
          </Typography>
          <Typography paragraph sx={{ color: 'white' }}>
            Blue Germany Holdings (Pty) Ltd provides end-to-end coal supply chain solutions.
          </Typography>
          <Button 
            variant="contained" 
            onClick={toggleServices}
            sx={{ 
              backgroundColor: 'white', 
              color: '#333',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              }
            }}
          >
            {isServicesVisible ? "Hide Services" : "Show Services"}
          </Button>
          {isServicesVisible && (
            <Box mt={2}>
              {services.map((service, index) => (
                <StyledCard 
                  key={index} 
                  sx={{ 
                    mb: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(5px)',
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {service.name}
                    </Typography>
                    <Typography>
                      {service.description}
                    </Typography>
                  </CardContent>
                </StyledCard>
              ))}
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  </Container>
</Box>

        {/* Products */}
        <Box py={6} bgcolor="grey.100">
          <Container>
            <Typography variant="h3" align="center" gutterBottom>
              Our Coal Grades
            </Typography>
            <Grid container spacing={4}>
              {grades.map((grade, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <StyledCard>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        {grade.name}
                      </Typography>
                      <Typography paragraph>
                        {grade.description}
                      </Typography>
                      <Button 
                        variant="outlined"
                        onClick={() => toggleDetails(grade.name)}
                      >
                        {selectedGrade === grade.name ? "Hide Details" : "View Specifications"}
                      </Button>
                      {selectedGrade === grade.name && (
                        <Box mt={2}>
                          <List dense>
                            {grade.specs.map((spec, idx) => (
                              <ListItem key={idx}>
                                <Typography variant="body2">{spec}</Typography>
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box py={6} sx={{ 
  backgroundImage: 'url("/images/heavy.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '100%',
}}>
  <Container maxWidth="md">
    <Typography variant="h3" align="center" gutterBottom sx={{ color: 'white', textShadow: '0 0 5px rgba(0,0,0,0.7)' }}>
      Ask Our Coal Expert
    </Typography>
    <Paper
      elevation={3}
      sx={{
        height: 500,
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        boxShadow: 3,
      }}
    >
      {/* White chat container */}
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: 1,
        }}
      >
        {/* Message area */}
        <Box p={2} flexGrow={1} overflow="auto">
          {messages.length === 0 ? (
            <Typography align="center" color="text.secondary" sx={{ mt: 10 }}>
              How can we assist you with your coal requirements today?
            </Typography>
          ) : (
            messages.map((msg, idx) => (
              <MessageBubble key={idx} owner={msg.role}>
                <Typography>{msg.content}</Typography>
              </MessageBubble>
            ))
          )}
          {isLoading && (
            <MessageBubble owner="bot">
              <Box display="flex" gap={1}>
                {[...Array(3)].map((_, i) => (
                  <Box 
                    key={i}
                    width={8}
                    height={8}
                    bgcolor="grey.500"
                    borderRadius="50%"
                    sx={{
                      animation: 'bounce 1.5s infinite',
                      animationDelay: `${i * 0.2}s`,
                      opacity: 0.6,
                    }}
                  />
                ))}
              </Box>
            </MessageBubble>
          )}
        </Box>
        {/* Input form */}
        <Box component="form" onSubmit={handleChatSubmit} p={2} display="flex">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your question"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            sx={{ mr: 1 }}
          />
          <IconButton 
            type="submit" 
            color="primary"
            disabled={isLoading || !input.trim()}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  </Container>
</Box>

<ContactSection />
</Box>

      {/* Footer */}
      <Box component="footer" py={4} bgcolor="primary.dark" color="primary.contrastText">
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" gutterBottom>
                Blue Germany Holdings (Pty) Ltd
              </Typography>
              <Typography>
                Your trusted partner in premium coal supply.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" gutterBottom>
                Contact
              </Typography>
              <List dense>
                <ListItem>
                  <EmailIcon sx={{ mr: 1 }} />
                  <Typography>info@bluegermanyholdings.com</Typography>
                </ListItem>
                <ListItem>
                  <PhoneIcon sx={{ mr: 1 }} />
                  <Typography>+27 75 444 6273</Typography>
                </ListItem>
                <ListItem>
                  <LocationOnIcon sx={{ mr: 1 }} />
                  <Typography>Johannesburg, South Africa</Typography>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
          <Typography align="center">
            © {new Date().getFullYear()} Blue Germany Holdings. All Rights Reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default App;