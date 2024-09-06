import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import { useHistory } from 'react-router-dom'; 
import './Home_doctors.css';

import { Doctor } from '../../models/Doctor';
const Home_doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const history = useHistory(); 

  useEffect(() => {
    fetch('/data/doctors.json')
      .then(response => response.json())
      .then(data => setDoctors(data))
      .catch(error => console.error('Error loading the doctors data:', error));
  }, []);

  const mainDoctor = doctors.find(doctor => doctor.id === 1);
  const otherDoctors = doctors.filter(doctor => doctor.id !== 1);


  const goToDoctorProfile = (doctorId: number) => {
    history.push(`/profile/${doctorId}`);
  };

  return (
    <IonPage className='mainPage'>
      <IonContent className="Home_doctors-content test">
        {mainDoctor && (
          <IonCard color="white" onClick={() => goToDoctorProfile(mainDoctor.id)}> 
            <img alt={`Photo of ${mainDoctor.name}`} src={mainDoctor.photo} />
            <IonCardHeader className='IonCardHeader'>
              <div className="card-container">
                <div className='card-title'>
                  <IonCardTitle className='IonCardTitle-name'>{mainDoctor.name}</IonCardTitle>
                  <div className="IonCardTitle-job">{mainDoctor.job}</div>
                </div>
                <div className="card-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < mainDoctor.rating ? 'filled' : ''}`}>&#9733;</span>
                  ))}
                </div>
              </div>
            </IonCardHeader>
          </IonCard>
        )}

        <div className="horizontal-scroll">
          {otherDoctors.map(doctor => (
            <IonCard color="white" className="small-card" key={doctor.id} onClick={() => goToDoctorProfile(doctor.id)}> 
              <img alt={`Photo of ${doctor.name}`} src={doctor.photo} />
              <IonCardHeader className='IonCardHeader'>
                <div className="card-container">
                  <div className='card-title2'>
                    <IonCardTitle className='IonCardTitle-name2'>{doctor.name}</IonCardTitle>
                    <div className="IonCardTitle-job2">{doctor.job}</div>
                  </div>
                  <div className="card-rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`star ${i < doctor.rating ? 'filled' : ''}`}>&#9733;</span>
                    ))}
                  </div>
                </div>
              </IonCardHeader>
            </IonCard>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home_doctors;
