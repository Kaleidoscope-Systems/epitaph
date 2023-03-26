import Head from 'next/head'
import Image from 'react-bootstrap/Image'
import styles from '../styles/Layout.module.css'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function SelectGender() {
  return (
    <Form.Select className='my-3'aria-label="Select gender">
      <option selected disabled>Select gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Plural">Plural</option>
    </Form.Select>
  );
}

function PrayerCustomizer() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

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
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" id='name' placeholder="Name"/>
            </Form.Group>
            <SelectGender />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default function About() {
    const savePrayerCustomizer = async (event) => {
        event.preventDefault();
        alert(`Your name is ${event.target.name.value} and gender is ${event.target.gender.value}`);
      };

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

        <PrayerCustomizer />

{/*         <div id='prayerCustomizer'>
            Automatically insert the person you're praying for into the below prayers:
            <form className="flex flex-col" onSubmit={savePrayerCustomizer}>
            <input type="text" id="name" className='form-control my-3' placeholder='Name' aria-label='Name'></input>
            <select className="form-select" id="gender" aria-label="Gender">
                <option selected disabled>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Plural">Plural</option>
            </select>
            <button
                type="submit"
                className="btn btn-primary px-4 py-2 my-3"
            >
                Save
            </button>
            </form>
        </div> */}
        
        <h2>Prayers for the Sick</h2>
        <p>
        Almighty Lord, Physician of souls and bodies, look down upon Your servant, ___ with Your great mercy, for he/she is suffering great infirmity of body and soul. Stretch forth Your loving arm which his so full of healing and health, and is able to raise ______ from his/her bed of pain. Reprove the spirit of weakness which is in _____. Drive far from him/her that which is afflicting by pain, wounds, chills, fever, or weakness of body. In your love for mankind; loosen, remit, and forgive all the sins of your servant, ____, whether committed in thought, word or deed; intentionally, or unwittingly; that he/she might also know healing of soul. Yea, O Lord, our God, have pity on Your creation, through the compassion of Your only-begotten Son, together with Your All-Holy, Good, and Life-Giving Spirit, both now and ever and unto ages of ages. Amen.
        </p>
      </main>
    </div>
    )
}