import React from 'react';
import { Eye, Star, Users, Globe } from 'lucide-react';
import styles from './AboutUsPage.module.css';
import storyBanner from '../../assets/images/story_banner.webp'; // New story banner
import brandConfig from '../../config/brandConfig';

// Helper to map icon string to Lucide icon component
const IconMapper = ({ iconName, ...props }) => {
  switch (iconName) {
    case 'Eye': return <Eye {...props} />;
    case 'Star': return <Star {...props} />;
    case 'Users': return <Users {...props} />;
    default: return <Star {...props} />;
  }
};

const AboutUsPage = () => {
  const { about_us } = brandConfig;

  return (
    <main className={styles.page}>
      
      <section className={styles.content}>
        <div className="container">
          
          {/* 2. STORY SECTION */}
          <div className={`${styles.storySection} reveal`}>
            <div className={styles.storyImageWrapper}>
              <img 
                src={storyBanner} 
                alt="Our Fashion Journey" 
                className={styles.storyImage} 
                loading="lazy"
              />
            </div>
            
            <div className={styles.storyTextContent}>
              <h2 className={styles.sectionHeading}>
                {about_us.story_heading}
              </h2>
              
              <div className={styles.storyBody}>
                {about_us.story_paragraphs.map((paragraph, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            </div>
          </div>

          {/* 2.5 MISSION & VISION SECTION */}
          <div className={`${styles.essenceSection} reveal stagger-1`}>
            <div className={styles.essenceLeft}>
              <div className={styles.essenceItem}>
                <div className={styles.essenceHeader}>
                  <div className={styles.essenceLine} />
                  <h3 className={styles.essenceLabel}>Our Mission</h3>
                </div>
                <p className={styles.essenceText}>
                  To think big, move fast, and stay ahead—delivering high-quality wholesale fashion with innovation, speed, and consistency.
                </p>
              </div>

              <div className={styles.essenceItem}>
                <div className={styles.essenceHeader}>
                  <div className={styles.essenceLine} />
                  <h3 className={styles.essenceLabel}>Our Vision</h3>
                </div>
                <p className={styles.essenceText}>
                  To build a trusted fashion ecosystem where growth is driven by ideas, quality, and long-term partnerships.
                </p>
              </div>
            </div>

            <div className={styles.essenceRight}>
              <div className={styles.founderThoughts}>
                <span className={styles.bigQuote}>&ldquo;</span>
                <h2 className={styles.mainThought}>
                  Think big, think fast, think ahead&mdash;no one has a monopoly on ideas.
                </h2>
                <div className={styles.additionalThoughts}>
                  <p>&ldquo;Whoever has achieved something great has never feared anyone.&rdquo;</p>
                  <p>&ldquo;If you wish to burn like the sun, you must rise every single day.&rdquo;</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. FOUNDER SECTION */}
          <div className={`${styles.founderSection} reveal stagger-1`}>
            <div className={styles.founderTextContent}>
              <p 
                className={styles.founderQuote} 
                dangerouslySetInnerHTML={{ __html: about_us.founder_quote }} 
              />
              
              <div className={styles.founderSignature}>
                <h3 className={styles.founderName}>{about_us.founder_name}</h3>
                <p className={styles.founderTitle}>{about_us.founder_title}</p>
              </div>
            </div>
            
            <div className={styles.founderImageWrapper}>
              <div className={styles.founderGlowPanel}>
                <Globe size={48} className={styles.founderGlowIcon} />
                <h4>RTC Global Sourcing Council</h4>
                <p>Governing quality, operations, and direct logistics networks across 800+ District Headquarters in India.</p>
              </div>
            </div>
          </div>

          {/* 4. WHY CHOOSE US SECTION */}
          <div className={`${styles.whyChooseSection} reveal stagger-2`}>
            <h2 className={styles.whyChooseHeading}>{about_us.why_choose_heading}</h2>
            
            <div className={styles.whyChooseGrid}>
              {about_us.why_choose_cards.map((card, idx) => (
                <div key={idx} className={styles.whyCard}>
                  <div className={styles.iconWrapper}>
                    <IconMapper iconName={card.icon} size={28} />
                  </div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDesc}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
