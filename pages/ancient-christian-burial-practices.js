import Head from 'next/head'
import Image from 'react-bootstrap/Image'
import styles from '../styles/Layout.module.css'
import Layout from '@/components/Layout'

export default function About() {
    const appModule = "home";
    return (
      <>
      <Layout title="Ancient Christian Burial Practices" metaDescriptionContent={process.env.NEXT_PUBLIC_SOCIETY_LONG_NAME} appModule={appModule}>
        <main className="text-bg-light p-4 rounded-5">
        <h1>
            Ancient Christian Burial Practices
        </h1>
        <h2>
            Ancient Christian Burial
        </h2>
        <p>
        Modern society has all but forgotten the beautiful and sacred burial traditions of the Church and replaced them with a fear of death and morbid views of the body from whom a soul has separated.
        </p>
        <h2>
            What are the differences?
        </h2>
        <Image className="float-end" src="/dormition-icon-300x222.jpg" alt="Icon of the Dormition of the Theotokos" rounded />
        <p>
        Modern methods and the Ancient Christian Burial practices differ widely. The Church has always honored the human body as created in the image of God and as a precious vessel of the Holy Spirit. Thus, when the body transfers from earth to Life Eternal we consider it a sacred event.
        </p>
        <p>
        We also know that whatever the Spirit of God touches, it sanctifies—such as when the woman touched the hem of Christ’s garment and experienced the healing power of Christ coming through the garment. The garment itself had no life in it, but it was still imbued with the power of the Holy Spirit. When the soul has separated from the body of a faithful Christian, the body still remains precious and sanctified because of the Holy Spirit having dwelt there. Prayerful handling and cleansing of that sacred vessel by a team of brothers and sisters in Christ seems both appropriate and blessed.
        </p>
        <p>
        Ancient Christian burial practices prayerfully prepare a body for its separation from its soul—a sad reality that God never intended. But the body is also prepared for their upcoming banquet with the King of Kings.
        </p>
        <h2>
            Burial
        </h2>
        <p>
        The Church teaches that the body is blessed to return to the dust from whence it was created. So from ancient days the Church sought to honor God’s plan with burial that would encourage and not artificially thwart that natural, earthly, bodily change. Current Society gives no such honor to an earthly body. Thus, the vast majority of people are now opting to despoil these temples of the Holy Spirit through cremation of the body—a practice not supported by the Orthodox Church.
        </p>
        <h2>
            Cleansing vs Embalming
        </h2>
        <p>
        From ancient times pagans attempted to give an appearance of ‘life after death’ by embalming, mummifying, or other methods.
Since Christians believe in true Life after death, the early Church sought to follow another path. Early burial practices reflected our belief in the bodily resurrection by allowing God’s natural bodily change from earthly to heavenly. This also made it easier to detect those whom God had so sanctified in life that their body remained incorrupt long after death. So from early times, the deceased bodies of Christians would be cleansed, prayerfully anointed by the loving community, and buried in a short time as is the Jewish custom.
        </p>
        <p>
        Many of us have been led to believe that these loving ancient practices can no longer be employed. Many think embalming is now ‘necessary’ to preserve the body until arrangements can be made, distant relatives arrive, etc. None of these are correct, and embalming is only ‘required’ in communicable disease situations or long separation of time between death and burial. Simple, natural, non-invasive measures can allow a body to wait for a number of days for burial, even in hot weather. This avoids the body-corrupting results of the embalming process.
        </p>
        <h2>
            Open Caskets
        </h2>
        <p>
        In modern society, it is also common for people to request that the body be ‘hidden’ from view. Unless the circumstances of death make it imprudent, the Orthodox maintain an open casket. The sacred body, still imbued with the Holy Spirit, can then help those attending to keep the ‘remembrance of death’ as an encouragement for their own effort toward spiritual transformation. Funerals also give remembrance of the Resurrection of the body by placing the casket facing the altar (and the East) where Christ will appear at His Second Coming.
        </p>
        <h2>
            Planning
        </h2>
        <p>
        The Ss. Nicodemus & Joseph Burial Society has gathered information that can aid an individual or a family in pre-planning a truly Christian ending to their life, facilitated by a loving Christian community. For those interested, books, articles, and other resources on an Orthodox ending to our life are available upon request.
        </p>
        <p>
        Our Society volunteers have taken direction from those experienced in traditional Orthodox burial, including specific Orthodox body preparation and burial practices. The society will likely be able to work with a funeral director if preparations are needed or desired in their facility. A call to your local Orthodox Priest can serve to activate all pre-planned Burial Society services. Some services or support may be possible even at the time of unanticipated repose, also by a call to the priest.
        </p>
        <h2>
            At the Time of Repose
        </h2>
        <p>
        The Burial Team will contact the church members to immediately begin the sign-up for 24 hr traditional reading of the Psalms, for the peaceful separation of the soul from the body. We will also help make contacts as you would have arranged in the pre-planning meeting.
        </p>
        <p>
        The Burial Society looks forward to helping you, or your loved ones, in preparing for this sacred moment in Christian life.
        </p>
      </main>
      </Layout>
      </>
    )
}