/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import styles from '../styles/Layout.module.css'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Accordion } from 'react-bootstrap';
import Layout from '@/components/Layout';

function SelectGender({ value, onChange }) {
  return (
    <Form.Select className='my-3' aria-label="Select gender" value={value} onChange={onChange}>
      <option disabled value="">Select gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Plural">Plural</option>
    </Form.Select>
  );
}

function PrayerCustomizer({ onSave }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleSave = () => {
    onSave({ name, gender });
    handleClose();
    return gender;
    
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Customize Prayers
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Prayer Customizer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name(s)</Form.Label>
              <Form.Control type="text" id='name' placeholder="Name(s)" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <SelectGender value={gender} onChange={(e) => setGender(e.target.value)} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default function About() {
  const [name, setName] = useState('________');
  const [gender, setGender] = useState('');
  const handleSavePrayerCustomizer = (data) => {    
    setName(data.name);
    setGender(data.gender);
  };
  const malePronouns = {
    subject: 'he',
    object: 'him',
    dependentPossessive: 'his',
    independentPossesive: 'his',
    reflexive: 'himself'
  };
  const femalePronouns = {
    subject: 'she',
    object: 'her',
    dependentPossessive: 'her',
    independentPossesive: 'hers',
    reflexive: 'herself'
  };
  const pluralPronouns = {
    subject: 'they',
    object: 'them',
    dependentPossessive: 'their',
    independentPossesive: 'theirs',
    reflexive: 'themselves'
  };
  const defaultPronouns = {
    subject: 'he/she',
    object: 'him/her',
    dependentPossessive: 'his/her',
    independentPossesive: 'his/hers',
    reflexive: 'himself/herself'
  }

  function genderToPronoun(context) {
    if (gender == "Male"){
      return(malePronouns[context]);
    }

    if (gender == "Female"){
      return(femalePronouns[context]);
    }

    if (gender == "Plural"){
      return(pluralPronouns[context]);
    }

    if (gender == ""){
      return(defaultPronouns[context]);
    }
  }

    return (
      <><Layout title="Prayers for the Sick, Dying, and Departed" metaDescriptionContent={process.env.NEXT_PUBLIC_SOCIETY_LONG_NAME} module="home">
        <main className="text-bg-light p-4 rounded-5 container-fluid">
          <h1>
            Prayers for the Sick, Dying, and Departed
          </h1>

          <PrayerCustomizer onSave={handleSavePrayerCustomizer} />
          <Button className='ms-3' variant="secondary" href="Booklet-of-Prayers-for-Sick-Dying-Departing.pdf" target='_blank'>
            Download PDF
          </Button>

          <Accordion defaultActiveKey={['0']} alwaysOpen className='mt-3'>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Prayers for the Sick</Accordion.Header>
              <Accordion.Body>
                <p>Almighty Lord, Physician of souls and bodies, look down upon Your {gender == "Plural" ? "servants" : "servant"}, {name} with Your great mercy, for {genderToPronoun("subject")} {gender == "Plural" ? "are" : "is"} suffering great infirmity of body and soul. Stretch forth Your loving arm which is so full of healing and health, and is able to raise {name} from {genderToPronoun("dependentPossessive")} bed of pain. Reprove the spirit of weakness which is in {name}. Drive far from {genderToPronoun("object")} that which is afflicting by pain, wounds, chills, fever, or weakness of body.</p>
                <p>In your love for mankind; loosen, remit, and forgive all the sins of your {gender == "Plural" ? "servants" : "servant"}, {name}, whether committed in thought, word or deed; intentionally, or unwittingly; that {genderToPronoun("subject")} might also know healing of soul.</p>
                <p>Yea, O Lord, our God, have pity on Your creation, through the compassion of Your only-begotten Son, together with Your All-Holy, Good, and Life-Giving Spirit, both now and ever and unto ages of ages. Amen.</p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Prayer for the Dying</Accordion.Header>
              <Accordion.Body>
                <p>O Lord Jesus Christ our God, for the sake of Your most holy wounds, hear our prayer and forgive all the transgressions of your humble {gender == "Plural" ? "servants" : "servant"}, {name}. At the moment of {genderToPronoun("dependentPossessive")} death, accept into Your merciful hands {genderToPronoun("dependentPossessive")} soul cleansed of all stain of sin, and place {genderToPronoun("object")} with Your Saints in the resplendent light of Your Kingdom. For You are our salvation and redemption, and we give glory to You, together with Your Eternal Father, and Your All-holy, Good, and Life-giving Spirit, now and forever, and unto ages of ages. Amen.</p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Prayers for Your Own Sickness</Accordion.Header>
              <Accordion.Body>
                <p>O Lord Jesus Christ, my God, who became Man and suffered death on the Cross for our salvation; visit me in my suffering and grant me grace and strength to bear that which is afflicting me even unto my salvation. Put far from me the spirit of disease, and every malady, pain, fever or wound to which they are bound. You who are the Healer of all, bring healing to me, of all manner of infirmity that plagues my body. And in Your tender mercy and compassion, grant, also, forgiveness of my sins which painfully wound my soul. Look upon these great weaknesses, but deal not with me according to my sins, but according to Your loving-kindness.</p>
                <p>Grant wisdom and skill of hand to all who minister to me in this infirmity of body and bless all the means used for my recovery. For You are the Good God who loves mankind. And to You we ascribe all glory; to the Father, and to the Son, and to the Spirit, both now and ever and unto ages of ages. Amen.</p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Prayer When Sickness Increases</Accordion.Header>
              <Accordion.Body>
                <p>O Lord Jesus Christ, Our God and Savior, for our sake You were born; and for our sake You were hungry and thirsty; for our sake You were mocked, scourged, and crowned with thorns. For our sake You suffered and died on the cross, offering up Your divine life for our salvation.
                  As You now grant Your {gender == "Plural" ? "servants" : "servant"}, {name} to share in Your sufferings, grant {genderToPronoun("object")} also to share in Your Grace. 
                  May Your wounds heal the wounds of {name}'s sins. May Your precious Blood wash away the stains of {genderToPronoun("dependentPossessive")} sins. May Your Divine Righteousness purge {name} of every iniquity.
                  Look upon {genderToPronoun("dependentPossessive")} faith in You, and the faith of us who pray, and do what is best for {name} according to Your mercy, rather than our merit. As sickness increases in him/her,
                  so likewise increase Your Power and Strength in {name}.
                  Let not {name}'s faith waver, nor {genderToPronoun("object")} hope to fail, nor {genderToPronoun("object")} love to grow cold. Let not the fear of suffering and
                  death cause {name} to cast away {genderToPronoun("object")} hope in You, nor to
                  lose courage and the will to fight every sickness and sin. Let {name} rather look always to You, even to the very end,
                  and cry out, as You, Yourself cried from the cross to God:
                  “Into Your hands, I commend My Spirit”, where all the saints continually shine with Your divine glory. For You
                  have suffered that we might be healed. You have died that we might live Eternally and send up thanksgiving and praise
                  to You, to the Father, Who sent You, and Your most Holy Spirit, who strengthens us to share Your passion, now and
                  ever and unto ages of ages. Amen.</p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Prayer for One Terminally Ill</Accordion.Header>
              <Accordion.Body>
                <p>O Almighty God and Father of our Lord Jesus Christ, we pray to You for your Servant {name} whose sickness is bringing {genderToPronoun("object")} to the end of {genderToPronoun("dependentPossessive")} earthly life. You are
                  the God whose only-begotten Son taught us that not even the smallest sparrow can fall without Your knowledge, and that You hold all creation in Your merciful arms.
                  Look upon your servant {name} and allow this illness to be for the death only of those things which are the result of evil and sin. Let {name}'s thoughts be quieted with the peace and
                  confidence of {genderToPronoun("dependentPossessive")} final deliverance into the fullness of Your love. Keep {genderToPronoun("dependentPossessive")} soul and body pure, and sanctify {genderToPronoun("object")} during the time {name} remains among us, that on the last day {name} may be raised up with all Your saints to live
                  with You in never-ending glory. For to You belong all praise and worship, to the Father, and to the Son, and to the Holy Spirit, now and forever, and unto ages of ages. Amen.</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

        </main>
      </Layout></>
    )
}
