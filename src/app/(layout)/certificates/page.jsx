import RoundedButton from '@/components/Home/RoundedButton';
import React from 'react';

const courses = [
  {
    name: 'Conspiracy',
    src: '/Final_Wendy/Conspiracy.jpg',
    description: 'The Supernatural University welcomes you to the pillar of Conspiracy! In today’s information age, the allure of conspiracy theories captivates many individuals, prompting them to delve deeper into this intriguing field of study. Some individuals seek to uncover hidden truths, believing that there are layers of information obscured from public view. The desire to “solve” seemingly problematic events and ideas often stems from a combination of curiosity and skepticism towards mainstream narratives. Individuals may find themselves questioning official accounts of events, leading them to explore alternative explanations that challenge conventional wisdom. Or, they may doubt the truth and motivations behind policies or concepts that have been introduced as standardized truth.\n As a CCT (Certified Conspiracy Theorist) degree seeker, not only will you study those conspiracy-related topics that have intrigued you, but also the various controversial concepts that have shaped public discourse and influenced historical events. You will engage in a wide range of topics, from the assassination of prominent figures to alleged government cover-ups and secret societies. JFK, the moon landing hoax, and 9/11 are, of course, several of the popular theories. However, the Conspiracy pillar covers a broad spectrum of other perhaps less-known but oh so thought-provoking issues such as the White, Gray, and Black Popes, the corruption of NASA, and Freemasonry. Participants will delve into a variety of significant events and theories that have captured public imagination throughout history. Earn your CCT degree and you’ll be sent your personalized signed certificate for you to display!'
  },
  {
    name: 'Cryptozoology',
    src: '/Final_Wendy/Cryptozoology.jpg',
    description: 'The Supernatural University welcomes you to the pillar of Cryptozoology! Cryptozoology is a fascinating field that investigates the existence of creatures whose reality has not yet been substantiated by mainstream science. The Supernatural University offers a unique opportunity to explore the mysteries of legendary creatures such as Bigfoot, the Loch Ness Monster, and the Chupacabra, as well as lesser-known cryptids from various cultures and traditions from across the globe.\n Despite its intriguing premise, cryptozoology faces significant skepticism from the scientific community. Due to a lack of empirical evidence supporting the existence of many cryptids, this area of study is considered by many to be a pseudoscience. Critics argue that many claims are based on hoaxes or misidentifications of known species. Nevertheless, proponents believe that continued exploration may one day yield discoveries that challenge our understanding of biodiversity.\n Cryptozoologists seek to gather evidence through field research, eyewitness accounts, and folklore to explore the possibility that there are, in fact,  strange, elusive beings that inhabit our world. The subject bridges myth and reality, inviting enthusiasts and skeptics alike to ponder what lies beyond our current knowledge.\n Upon completion, you will be awarded your CRhD (Cryptozoology Expert Honorary Degree) and be sent your degree certificate.'
  },
  {
    name: 'Magicology',
    src: '/Final_Wendy/Magicology.jpg',
    description: 'The Supernatural University welcomes you to the pillar of Magicology!  Magicology gathers the  mysteries of magical creatures from cultures and eras around the world. As a student, you will embark on a journey through time and imagination, discovering beings such as mermaids, dragons, and fairies that have captivated human minds for centuries.\n These creatures serve not only as entertainment but also as allegories for moral lessons and cultural values. The stories have been passed down through generations, reflecting the culture, beliefs, hopes, dreams, and so much more of those who have told and believed the tales of these magical beings. The power, enchantment, and significance of the lore have molded civilizations for generations. The legends have evolved over time while often retaining their core characteristics which can still resonate with the modern human experience of many cultures.\n We are confident that you will enjoy the journey on your quest to earn your WZrD (Wizard Zeroth Regent Degree) in the College of Magicology. Once completed, you can proudly display your beautiful, personalized certificate with the pride and honor befitting a Knight of the Roundtable!'
  },
  {
    name: 'Phenomenology',
    src: '/Final_Wendy/Phenomenology.jpg',
    description: 'The Supernatural University welcomes you to the pillar of  Phenomenology! Hop aboard as together we probe the many dimensions of human consciousness, perception, and lived experiences in our search for truth and enlightenment.  We will engage with the historical accounts of extraordinary people with astonishing  abilities and seemingly unbelievable experiences, many of which have been documented by reputable sources.\n In your quest to earn your PMhD (Phenomenology Master Honorary Degree), you will learn about the remarkable talent of John Cheng, The Magus of Java, Fionna Johanssons fantastic ability of clairvoyance, and the extraordinary foresight of Nostradamus.\n At The Supernatural University, we aim to foster a vibrant community of scholars, students, and enthusiasts passionate about unraveling the complexities of human existence. Whether you are new to phenomenology or join us as a seasoned researcher, our website offers a wealth of knowledge and a supportive network for intellectual exchange.\n Join us in exploring the depths of human experience, perception, and the interconnectedness of self and world as we navigate the profound terrain of phenomenology together.'
  },

  {
    name: 'Ufology',
    src: '/Final_Wendy/UFOlogy.jpg',
    description: 'The Supernatural University welcomes you to the pillar of Ufology! The study of ufology, AKA the study of Unidentified Flying Objects (UFOs), encompasses a wide range of phenomena, including sightings, encounters, and investigations into aerial events that cannot be easily explained. This field attracts interest from both amateur enthusiasts and professional researchers, as it jumps headlong  into questions about extraterrestrial life, advanced technology, and government secrecy.\n At The Supernatural University, as you pursue your degree in Ufology, we cover subjects ranging from alien abduction claims to exotic alien materials. Together, we will analyze historical documentation including photographs, videos, media reports, government documents, and eyewitness accounts.\n Historically, UFO sightings date back decades. In our pursuit of truth, we will reach back into those distant years to explore the many events that have occurred. The Roswell, New Mexico (1972), Washington D.C. (1952) and more recent encounters in Dudley England (2011) will be explored.   We will also study other extraterrestrial phenomena such as crop circles, crystal skulls, exotic materials, and ancient civilizations’ interactions with the extraterrestrial. As you seek your Ufology degree and NBA (Nuanced Bonafide Academic), we are confident  you will enjoy learning and exploring all things otherworldly.'
  },
  {
    name: 'Unexplained',
    src: '/Final_Wendy/Unexplained.jpg',
    description: "The Supernatural University welcomes you to the pillar of Unexplained! Within this pillar, you will  take a deep dive into the riddles of our world through a collection of lectures on enigmatic people and events. The Unexplained pillar is dedicated to presenting the mysteries that have captivated and perplexed humanity for millenia, many of which we are no closer to understanding in our modern scientific era than were the ancient civilizations of the past.\n Explore a wide range of topics, from historical perplexities such as Stonehenge to the missing 'ghost crew' of the sailing ship Mary Celeste. Our curated selection of  lectures offers a fascinating journey into the unknown, featuring compelling narratives and thought-provoking theories.\n Join our community of truth-seekers, skeptics, and enthusiasts as we embark on a quest to shed light on the mysteries that continue to defy conventional explanations. Whether you're captivated by unexplained time travelers, spontaneous combustion, or inexplicable ancient artifacts, or intrigued by the Bermuda Triangle (did you know there is an Alaska Triangle as well?), the Unexplained pillar provides an immersive and informative experience for all interest levels. Our diverse range of content ensures that there s something for everyone with a curious mind and a passion for unraveling the seemingly incomprehensible.  Each lecture brings you closer to becoming a certified XEhD and obtaining your Unexplained Events Expert Honorary degree."
  },
  {
    name: 'Paranormology',
    src: '/Final_Wendy/Paranormal.jpg',
    description: 'The Supernatural University invites you into the pillar of  Paranormalogy! Paranormalogy is your gateway to the mystifying and otherworldly. Immerse yourself in a realm of mysterious phenomena and supernatural occurrences through our captivating collection of informative lectures. From ghostly encounters such as that of the Bell Witch Haunting to the Spirits of Mt. Everest and Babylon. Our curated selection of lectures offers a thrilling and thought provoking exploration of the metaphysical.  Each lecture presents captivating narratives, provocative  theories, and compelling firsthand accounts that will leave you both intrigued and unsettled.\n Whether you re a skeptic, a truth-seeker, or are already a passionate enthusiast of the paranormal, we invite you to join our community on a quest for understanding and enlightenment as the mysteries of the unknown unfold before your eyes. Prepare to be captivated, enlightened, and perhaps even spooked as you embark on a mesmerizing journey into the realm of the paranormal. So, what are you waiting for? Join us and earn your PEhD (Paranormal Expert Honorary Degree). At the conclusion, you will be sent your much prized Paranormology certificate. And who knows, you might end up believing in ghosts after all.\n BONUS: For all Paranormal enthusiasts, we have included a bonus section - Haunted Places. Sign up to earn your PEhD, and the Haunted Places lecture series – an additional 30 lectures on some of the most chilling haunts around the world – is included for free!  The Driskill Hotel, the Shanghai Tunnels, and Alcatraz are just a few of the eerie locales that are included. The Supernatural University offers a captivating, chilling journey into the realm of the haunted, suitable for all adventurers.'
  },

];

const CertificateList = () => {
  return (
    <div className="max-w-[1320px] px-[20px] py-5 md:py-[80px] mx-auto flex flex-col gap-y-12">
      {courses.map((course, index) => {
        const formattedText = course.description.replace(/\n/g, '<br />');

        return (
          <div
            key={index}
            id={course.name}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
          >
            <img
              className={`w-full h-[325px] md:h-[500px] rounded-[10px] shadow ${(index + 1) % 2 === 0 ? 'order-2 md:order-2' : 'order-2'
                }`}
              src={course.src}
              alt={course.name}
            />

            <div
              className={`${(index + 1) % 2 === 0 ? 'order-2 md:order-1' : 'order-2'
                }`}
            >
              <h2 className="text-heading-xl">
                {course.name}
              </h2>
              <div
                className={`scroll-container h-[370px] flex-col justify-start items-start gap-5 md:gap-[30px] inline-flex`}
              >

                <div className="text-[#202020] text-subtitle-md md:text-justify">
                  <div dangerouslySetInnerHTML={{ __html: formattedText }} />
                </div>
              </div>
              <RoundedButton
                href={'/#plan'}
                text="Subscribe now"
                className="bg-white mt-3"
                secondary
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CertificateList;
