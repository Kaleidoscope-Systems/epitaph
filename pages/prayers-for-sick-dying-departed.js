import Head from 'next/head'
import Image from 'react-bootstrap/Image'
import styles from '../styles/Layout.module.css'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

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
    console.log(gender);
    return gender;
    
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Customize Prayer
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
    console.log(context)
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
        <div>
      <Head>
        <title>Prayers for the Sick, Dying, and Departed - Ss. Nicodemus & Joseph Burial Society</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Ss. Nicodemus and Joseph Burial Society of Northern Colorado" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-bg-light p-4 rounded-5">
        <h1>
          Prayers for the Sick, Dying, and Departed
        </h1>

        <PrayerCustomizer onSave={handleSavePrayerCustomizer}/>
        <Button className='ms-3' variant="secondary" href="Booklet-of-Prayers-for-Sick-Dying-Departing.pdf" target='_blank'>
        Download PDF
        </Button>

        <h2>Prayers for the Sick</h2>
        <p id ="prayer">
        Almighty Lord, Physician of souls and bodies, look down upon Your servant, {name} with Your great mercy, for {genderToPronoun("subject")} {gender == "Plural"?"are":"is"} suffering great infirmity of body and soul. Stretch forth Your loving arm which is so full of healing and health, and is able to raise {name} from {genderToPronoun("dependentPossessive")} bed of pain. Reprove the spirit of weakness which is in {name}. Drive far from {genderToPronoun("object")} that which is afflicting by pain, wounds, chills, fever, or weakness of body. In your love for mankind; loosen, remit, and forgive all the sins of your servant, {name}, whether committed in thought, word or deed; intentionally, or unwittingly; that {genderToPronoun("subject")} might also know healing of soul. Yea, O Lord, our God, have pity on Your creation, through the compassion of Your only-begotten Son, together with Your All-Holy, Good, and Life-Giving Spirit, both now and ever and unto ages of ages. Amen.
        </p>
      </main>
    </div>
    )
}