import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Header from './components/Header';
import ScriptSection from './components/ScriptSection';
import InteractiveMap from './components/InteractiveMap';
import type { Section } from './types';
import Footer from './components/Footer';

const mockSections: Section[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    speaker: 'President',
    content: `The Assembly will now come to order.
Illustrious delegates, venerable educators, and esteemed guests, I bid you all a warm and heartfelt welcome to this Mock UN General Assembly. I am Sanket Kumar Padhan, profoundly honored to preside over this session as the President of the Assembly.

Today, we gather under the noble banner of international diplomacy to address some of the most pressing issues of our time. Our agenda, Global Challenges: Climate Change, Health Crises, and Sustainable Development, calls for a synthesis of intellect, compassion, and innovation to tackle the multifaceted crises that transcend borders and generations.
This forum represents an opportunity for us to embody the values of the United Nations: dialogue, cooperation, and a shared vision for a sustainable future. Let us proceed with diligence and mutual respect.

I now invite the General Secretary to conduct the roll call and formally open the session.`
  },
  {
    id: 'roll-call',
    title: 'Roll Call',
    speaker: 'General Secretary',
    content: `Thank you, Mr. President.

Delegates, as I call your country’s name, please respond with either 'Present' or 'Present and Voting':

Argentina
Brazil
Cameroon
China
France
Germany
India
Japan
Russia
South Africa
Syria
Ukraine
United Kingdom
United States
Observer organizations in attendance today are:

World Health Organization (WHO)
United Nations Environment Programme (UNEP)
International Monetary Fund (IMF)
Intergovernmental Panel on Climate Change (IPCC)
United Nations High Commissioner for Refugees (UNHCR)
All delegations are accounted for, Mr. President.`
  },
  {
    id: 'setting-the-agenda',
    title: 'Setting the Agenda',
    speaker: 'President',
    content: `Thank you, General Secretary.

Delegates, the agenda for today’s session is Global Challenges: Climate Change, Health Crises, and Sustainable Development. Are there any motions to modify or add to the agenda?

(Silence.)

Hearing none, the agenda is hereby adopted by consensus.

We will now move to the General Debate, where each delegation will present their opening statement. Delegates, you are reminded to adhere to the one-minute time limit. I now invite the Delegate of Argentina to deliver their statement.`
  },
  {
    id: 'opening-statements',
    title: 'Opening Statements',
    speaker: 'President',
    content: `Thank you, General Secretary. Delegates, we now proceed to the opening statements. I would like to remind everyone to address each other as 'Delegate of their respective country' and to keep their statements concise and respectful. Each delegate will have 1 minute for their statement. Our timekeeper, [Student Name], will keep track of the time. Let us begin. Delegate of Argentina, you have the floor.

I now invite the Delegate of Argentina to deliver their opening statement.`
  },
  {
    id: 'argentina-statement',
    title: 'Argentina',
    speaker: 'Delegate of Argentina',
    content: `Thank you, Mr. President.

Argentina believes that addressing climate change requires a united global effort. We propose increasing investments in renewable energy and establishing an International Green Fund to assist developing nations in adopting sustainable practices.

Thank you.`
  },
  {
    id: 'brazil-statement',
    title: 'Brazil',
    speaker: 'Delegate of Brazil',
    content: `Thank you, Mr. President.

Brazil emphasizes the critical role of biodiversity preservation in combating climate change. We advocate for protecting the Amazon rainforest and call for international support to promote sustainable eco-tourism.

Thank you.`
  },
  {
    id: 'cameroon-statement',
    title: 'Cameroon',
    speaker: 'Delegate of Cameroon',
    content: `Merci, Monsieur/Madame le Président.

Cameroon highlights the adverse effects of climate change on our agriculture and economy, particularly in vulnerable regions. We call for increased international assistance to combat desertification and build resilience against these challenges.

Merci.`
  },
  {
    id: 'china-statement',
    title: 'China',
    speaker: 'Delegate of China',
    content: `Thank you, Mr. President.

China acknowledges the deep connections between climate change, health crises, and development. We propose a Global Green Partnership to advance technology transfers, renewable energy adoption, and global health infrastructure improvements.

Thank you.`
  },
  {
    id: 'france-statement',
    title: 'France',
    speaker: 'Delegate of France',
    content: `Merci, Monsieur/Madame le Président.

France strongly advocates for enhanced international cooperation under the Paris Agreement to accelerate the transition to renewable energy and protect vulnerable ecosystems through advanced green technologies.

Merci beaucoup.`
  },
  {
    id: 'germany-statement',
    title: 'Germany',
    speaker: 'Delegate of Germany',
    content: `Thank you, Mr. President.

Germany proposes robust frameworks for innovation and sustainable transitions. We aim to lead global efforts in establishing a circular economy that prioritizes sustainability, innovation, and equitable development for all.

Vielen Dank.`
  },
  {
    id: 'india-statement',
    title: 'India',
    speaker: 'Delegate of India',
    content: `Thank you, Mr. President.

India emphasizes the importance of balancing economic development with environmental sustainability. We call for global partnerships to finance clean energy projects and promote green technologies that address the needs of developing nations.

Thank you.`
  },
  {
    id: 'japan-statement',
    title: 'Japan',
    speaker: 'Delegate of Japan',
    content: `Thank you, Mr. President.

Japan recognizes the urgency of disaster risk reduction in the face of climate change. We propose a Global Resilience Initiative to establish early warning systems, disaster recovery programs, and enhanced international coordination.

Thank you.`
  },
  {
    id: 'russia-statement',
    title: 'Russia',
    speaker: 'Delegate of Russia',
    content: `Thank you, Mr. President.

Russia highlights the importance of energy security and sustainable energy systems. We propose a global framework to reduce conflicts over resources and promote cooperation in energy distribution.

Thank you.`
  },
  {
    id: 'south-africa-statement',
    title: 'South Africa',
    speaker: 'Delegate of South Africa',
    content: `Thank you, Mr. President.

South Africa stresses the need to address poverty and inequality as integral to combating climate change. We propose strengthening international partnerships to promote green solutions that benefit vulnerable populations.

Thank you.`
  },
  {
    id: 'syria-statement',
    title: 'Syria',
    speaker: 'Delegate of Syria',
    content: `Thank you, Mr. President.

Syria calls for immediate humanitarian aid to regions devastated by climate-related disasters and conflict. We propose establishing international mechanisms to support crisis-affected areas comprehensively.

Thank you.`
  },
  {
    id: 'ukraine-statement',
    title: 'Ukraine',
    speaker: 'Delegate of Ukraine',
    content: `Thank you, Mr. President.

Ukraine underscores the importance of upholding sovereignty and addressing the climate impact on war-affected regions. We propose global support for recovery efforts that prioritize sustainable development.

Thank you.`
  },
  {
    id: 'united-kingdom-statement',
    title: 'United Kingdom',
    speaker: 'Delegate of the United Kingdom',
    content: `Thank you, Mr. President.

The United Kingdom advocates for strong international partnerships to phase out fossil fuels, scale renewable energy investments, and support green technology adoption worldwide. We must act decisively to ensure a sustainable future.

Thank you.`
  },
  {
    id: 'united-states-statement',
    title: 'United States',
    speaker: 'Delegate of the United States',
    content: `Thank you, Mr. President.

The United States believes in fostering global innovation to address climate change and health crises. We propose investments in cutting-edge green technologies and public-private partnerships to ensure sustainable growth for all nations.

Thank you.`
  },
  {
    id: 'observer-statements',
    title: 'Observer Statements',
    speaker: 'President',
    content: `Thank you, all delegates, for your insightful opening statements.

Now, let us hear from our esteemed observer organizations, whose expertise and perspectives are crucial in addressing today’s agenda. Each observer will have one minute to present their viewpoint.

We begin with the representative from the World Health Organization (WHO).`
  },
  {
    id: 'who-statement',
    title: 'World Health Organization',
    speaker: 'WHO Representative',
    content: `Thank you, Mr. President.

The World Health Organization underscores the alarming health impacts of climate change, which exacerbate existing health crises. Rising temperatures, natural disasters, and shifting disease patterns place immense strain on health systems globally. We urge member states to integrate health considerations into their climate strategies and strengthen global health infrastructure to protect vulnerable populations.

Thank you.`
  },
  {
    id: 'unep-statement',
    title: 'United Nations Environment Programme',
    speaker: 'UNEP Representative',
    content: `Thank you, Mr. President.

The UNEP stresses the urgency of transitioning to renewable energy and drastically reducing greenhouse gas emissions. As custodians of our planet, we must prioritize sustainable development pathways and adopt clean technologies to curb global warming. Environmental protection is not a choice but a necessity for the survival of all.

Thank you.`
  },
  {
    id: 'imf-statement',
    title: 'International Monetary Fund',
    speaker: 'IMF Representative',
    content: `Thank you, Mr. President.

The IMF calls for the establishment of a Global Green Fund to finance climate mitigation and adaptation strategies, particularly in vulnerable and developing economies. By pooling resources and mobilizing international capital, we can ensure financial resilience and equitable support for nations bearing the brunt of climate change.

Thank you.`
  },
  {
    id: 'ipcc-statement',
    title: 'Intergovernmental Panel on Climate Change',
    speaker: 'IPCC Representative',
    content: `Thank you, Mr. President.

The IPCC underscores the critical need to limit global warming to 1.5°C above pre-industrial levels to avert catastrophic impacts. Science-based policies and decisive action must form the backbone of our collective response. This includes phasing out fossil fuels, enhancing carbon sequestration, and strengthening global commitments to climate agreements.

Thank you.`
  },
  {
    id: 'unhcr-statement',
    title: 'United Nations High Commissioner for Refugees',
    speaker: 'UNHCR Representative',
    content: `Thank you, Mr. President.

The UNHCR emphasizes the plight of displaced populations affected by climate change and crises. Climate-induced disasters are forcing millions to flee their homes, creating unprecedented challenges. We advocate for inclusive strategies that protect and empower displaced communities, ensuring that no one is left behind in our global efforts.

Thank you.`
  },
  {
    id: 'moderated-debate',
    title: 'Moderated Debate',
    speaker: 'President',
    content: `Thank you, delegates, for your compelling opening statements. We will now transition to a moderated debate. Delegates are encouraged to respond to points raised, pose questions to one another, or introduce new perspectives. Please raise your placards and wait to be recognized.

The Delegate of France, you have the floor.`
  },
  {
    id: 'france-response',
    title: 'France',
    speaker: 'Delegate of France',
    content: `Thank you, Mr. President.

The Delegate of China proposed a Global Green Partnership. While we support the concept of a multilateral framework for sharing renewable energy technologies, there remains a crucial question of equitable access. How does China plan to ensure that these technologies are accessible to the poorest and most vulnerable countries without exacerbating global inequalities?`
  },
  {
    id: 'china-response',
    title: 'China',
    speaker: 'Delegate of China',
    content: `Thank you, Delegate of France, for raising this critical issue.

China’s proposal is based on creating a technology-sharing framework under the auspices of the United Nations, where renewable energy technologies will be made available to low-income nations at subsidized rates. The initiative will be supported through a combination of contributions from developed countries, multinational corporations, and international financial institutions. The aim is to make sustainable technologies both accessible and affordable for those who need them most.`
  },
  {
    id: 'japan-response',
    title: 'Japan',
    speaker: 'Delegate of Japan',
    content: `Thank you, Mr. President.

While the idea behind China's Global Green Partnership is commendable, I must raise a concern regarding transparency. How does China intend to ensure that the funding is allocated fairly, and that there is no political bias in the distribution of these resources? Given the scale of this initiative, accountability mechanisms will be essential.`
  },
  {
    id: 'china-accountability',
    title: 'China Accountability',
    speaker: 'Delegate of China',
    content: `Thank you for your thoughtful question, Delegate of Japan.

We fully recognize the importance of transparency in this initiative. To ensure accountability, we propose the establishment of an oversight committee appointed by the United Nations. This committee will comprise representatives from all participating nations, including both donor and recipient countries. The committee will be responsible for monitoring the progress of the initiative, conducting regular audits, and publishing transparent reports on the allocation of resources. We are also open to Japan’s partnership in co-leading this initiative to ensure further accountability and integrity.`
  },
  {
    id: 'india-response',
    title: 'India',
    speaker: 'Delegate of India',
    content: `Thank you, Mr. President.

While technology-sharing frameworks are certainly valuable, we must acknowledge that many developing nations, including India, face substantial challenges beyond mere access to technology. Infrastructure deficits, lack of technical skills, and high upfront costs are formidable barriers to the implementation of these green technologies, especially in rural areas.

Therefore, in addition to technology transfer, India proposes a parallel initiative focusing on capacity-building and financing for the implementation of green technologies in rural and remote regions. This would include training programs for local technicians and subsidies to cover initial infrastructure costs. We must ensure that green technologies are not just available, but also implementable.`
  },
  {
    id: 'germany-response',
    title: 'Germany',
    speaker: 'Delegate of Germany',
    content: `Thank you, Mr. President.

The Delegate of India has raised an important point about the systemic challenges faced by developing countries. Germany fully supports the idea of capacity-building and financing initiatives, especially in rural areas. However, to avoid overlapping efforts and potential inefficiencies, we propose that these initiatives be integrated into the existing frameworks of the Paris Agreement. This would help streamline international efforts and direct resources more effectively. By aligning our actions with the Paris Agreement’s mechanisms, we can prevent duplicative funding and maximize the impact of our collective efforts.`
  },
  {
    id: 'brazil-response',
    title: 'Brazil',
    speaker: 'Delegate of Brazil',
    content: `Thank you, Mr. President.

The proposals before us are indeed ambitious and, if well-implemented, could drive significant progress. However, we must also recognize that global challenges like climate change require urgent action. While we focus on long-term solutions like technology sharing and capacity-building, we cannot ignore the need for immediate policies to combat deforestation and ecosystem degradation, particularly in the Amazon. Brazil calls for a global push to halt deforestation by supporting both legal frameworks and financial mechanisms that incentivize the protection of critical ecosystems.`
  },
  {
    id: 'south-africa-response',
    title: 'South Africa',
    speaker: 'Delegate of South Africa',
    content: `Thank you, Mr. President.

While we commend the efforts to share technologies and promote renewable energy, South Africa emphasizes the need to address the broader issues of poverty and inequality that exacerbate the impacts of climate change in developing countries. As we advance toward a green economy, we must ensure that the transition does not leave vulnerable populations behind. South Africa advocates for policies that integrate social protections and sustainable economic development, ensuring that the benefits of green technologies are accessible to the most marginalized communities.`
  },
  {
    id: 'united-states-response',
    title: 'United States',
    speaker: 'Delegate of the United States',
    content: `Thank you, Mr. President.

The proposals outlined by our fellow delegates represent important steps forward, but we must be mindful of the need for innovation and flexibility in our approach. The United States believes that private sector investment and cutting-edge technology will play a pivotal role in achieving sustainability. Therefore, we propose that all initiatives be open to public-private partnerships that encourage innovation, especially in sectors like energy storage and carbon capture. By combining the efforts of governments and businesses, we can expedite the transition to a green future.`
  },
  {
    id: 'united-kingdom-response',
    title: 'United Kingdom',
    speaker: 'Delegate of the United Kingdom',
    content: `Thank you, Mr. President.

I fully agree with the United States regarding the importance of innovation, but we must also remember the importance of multilateralism. The challenges we face are global, and no single country or corporation can solve them alone. The United Kingdom calls for enhanced international cooperation, particularly in the form of joint ventures and global research networks, to drive sustainable technological development. We also support the ideas of capacity-building and integrating these proposals into existing frameworks such as the Paris Agreement.`
  },
  {
    id: 'proposals-and-voting',
    title: 'Proposals and Voting',
    speaker: 'President',
    content: `Thank you for the spirited discussions, delegates. We now transition to the proposals segment, where you will present actionable solutions for today’s agenda: Global Challenges: Climate Change, Health Crises, and Sustainable Development.

Each delegate will have one minute to present their proposal. Following this, we will move to the voting process. Please remember that proposals require a simple majority to pass, and abstentions are allowed.

Let us begin with the Delegate of Argentina. Delegate, you have the floor.`
  },
  {
    id: 'argentina-proposal',
    title: 'Argentina Proposal',
    speaker: 'Delegate of Argentina',
    content: `Thank you, Mr. President.

Argentina proposes the establishment of an International Green Fund to support renewable energy projects in developing nations. This fund will prioritize grants and low-interest loans for solar, wind, and hydroelectric power initiatives, enabling equitable access to clean energy and reducing global carbon emissions. This will not only help tackle climate change but also promote energy security in vulnerable regions, ensuring that no nation is left behind in the green transition.

Thank you.`
  },
  {
    id: 'japan-proposal',
    title: 'Japan Proposal',
    speaker: 'Delegate of Japan',
    content: `Thank you, Mr. President.

Japan proposes the Global Resilience Initiative, a comprehensive framework aimed at enhancing disaster risk reduction worldwide. This initiative includes early warning systems, capacity building, and coordinated international responses to mitigate the impacts of natural disasters exacerbated by climate change. This proposal will strengthen global resilience, particularly in disaster-prone regions, and ensure that countries have the tools they need to adapt to and recover from increasingly frequent extreme weather events.

Thank you.`
  },
  {
    id: 'france-proposal',
    title: 'France Proposal',
    speaker: 'Delegate of France',
    content: `Thank you, Mr. President.

France proposes expanding the Paris Agreement framework to include greater innovation funding for sustainable technologies. This would involve increased financial contributions from developed nations to a global innovation fund, fostering groundbreaking solutions to the intertwined crises of climate change and global health. By prioritizing investments in research, we can develop cutting-edge technologies that will provide long-term solutions and catalyze the transition to a sustainable and resilient global economy.

Thank you.`
  },
  {
    id: 'china-proposal',
    title: 'China Proposal',
    speaker: 'Delegate of China',
    content: `Thank you, Mr. President.

China proposes the Global Green Partnership, a multilateral initiative for technology sharing and infrastructure development in renewable energy. This partnership will bridge the gap between developed and developing nations, ensuring access to state-of-the-art technologies and accelerating the transition to a sustainable future. By pooling resources and expertise, we can address the urgent challenges posed by climate change and promote shared prosperity through equitable growth. This initiative will empower nations to meet their climate goals while promoting global cooperation for a cleaner, greener planet.

Thank you.`
  },
  {
    id: 'voting-process',
    title: 'Voting Process',
    speaker: 'President',
    content: `Thank you, delegates, for presenting such thoughtful and innovative proposals. We will now move to the voting segment. Delegates, please remember that each country has one vote, and a simple majority is required for a proposal to pass. Abstentions are permitted.

Let us begin with the proposal by Argentina: The International Green Fund. Those in favor, please raise your placards.`
  },
  {
    id: 'argentina-vote-result',
    title: 'Argentina Vote Result',
    speaker: 'General Secretary',
    content: `Mr. President, the proposal by Argentina has received [number] votes in favor, [number] against, and [number] abstentions. The proposal has [passed/failed].`
  },
  {
    id: 'japan-vote',
    title: 'Japan Vote',
    speaker: 'President',
    content: `Thank you, General Secretary. Let us now proceed to the proposal by Japan: The Global Resilience Initiative. Delegates in favor, please raise your placards.`
  },
  {
    id: 'japan-vote-result',
    title: 'Japan Vote Result',
    speaker: 'General Secretary',
    content: `Mr. President, the proposal by Japan has received [number] votes in favor, [number] against, and [number] abstentions. The proposal has [passed/failed].`
  },
  {
    id: 'france-vote',
    title: 'France Vote',
    speaker: 'President',
    content: `Thank you, General Secretary. Let us now proceed to the proposal by France: Expanding the Paris Agreement Framework for Greater Innovation Funding. Delegates in favor, please raise your placards.`
  },
  {
    id: 'france-vote-result',
    title: 'France Vote Result',
    speaker: 'General Secretary',
    content: `Mr. President, the proposal by France has received [number] votes in favor, [number] against, and [number] abstentions. The proposal has [passed/failed].`
  },
  {
    id: 'china-vote',
    title: 'China Vote',
    speaker: 'President',
    content: `Thank you, General Secretary. Let us now proceed to the proposal by China: The Global Green Partnership. Delegates in favor, please raise your placards.`
  },
  {
    id: 'china-vote-result',
    title: 'China Vote Result',
    speaker: 'General Secretary',
    content: `Mr. President, the proposal by China has received [number] votes in favor, [number] against, and [number] abstentions. The proposal has [passed/failed].`
  },
  {
    id: 'closing-statements',
    title: 'Closing Statements',
    speaker: 'President',
    content: `Distinguished delegates, today’s debates have illuminated the complexities of our global challenges and the necessity of collective action. Let us carry forward this spirit of diplomacy to create tangible change.

With that, I declare this session of the Mock UN General Assembly adjourned. Thank you.`
  },
  {
    id: 'general-secretary-closing',
    title: 'General Secretary Closing',
    speaker: 'General Secretary',
    content: `Thank you, Mr. President. Delegates, we hope this session has been enriching and inspires you to contribute meaningfully to global dialogue. This concludes our assembly.`
  }
  // Add more sections as needed
];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const downloadPDF = () => {
    const pdfData = '/MUN.File.pdf'; // URL or base64-encoded data of the PDF
    window.open(pdfData, '_blank');
    fetch(pdfData)
        .then(response => response.blob())  // Fetch the PDF file as a Blob
        .then(blob => {
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);  // Create a URL for the Blob
            link.href = url;
            link.download = 'MUN.file.pdf';  // The name of the downloaded file
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);  // Clean up the Blob URL after use
        })
        .catch(error => console.error('Error downloading the file:', error));
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
      />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Mock UN General Assembly
          </h2>
          
          <InteractiveMap/>
        </motion.section>

        <section id="script" className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Assembly Script
          </h3>
          
          <button 
            onClick={downloadPDF} 
            className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Download Script as PDF
          </button>
          
          {mockSections.map((section) => (
            <ScriptSection
              key={section.id}
              section={section}
              isOpen={openSection === section.id}
              onToggle={() => setOpenSection(openSection === section.id ? null : section.id)}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;