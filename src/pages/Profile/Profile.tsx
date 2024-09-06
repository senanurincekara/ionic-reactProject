import React, { useEffect, useState } from 'react';
import {
  IonToolbar,IonButtons,IonTitle, IonContent,IonPage, IonCard,IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonModal,IonDatetime,} from '@ionic/react';
import { useParams } from 'react-router-dom';
import './Profile.css';
import { calendarOutline } from 'ionicons/icons';

import { Doctor } from '../../models/Doctor';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    fetch('/data/doctors.json')
      .then((response) => response.json())
      .then((data) => {
        const selectedDoctor = data.find(
          (doctor: Doctor) => doctor.id === Number(id)
        );
        setDoctor(selectedDoctor);
      })
      .catch((error) => console.error('Error loading the doctor data:', error));
  }, [id]);

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString()
  );

  const handleDateChange = (e: CustomEvent) => {
    setSelectedDate(e.detail.value!);
  };

  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  return (
    <IonPage>
      <IonContent>
        <div className="container"></div>

        {doctor ? (
          <>
            <div className="container2">
              <img src={doctor.photo} alt="Profile" />
            </div>

            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{doctor.name}</IonCardTitle>

                <div className="profile-info">
                  <div className="job-and-stars">
                    <div>{doctor.job}</div>
                    <div className="star-rating">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`star ${i < doctor.rating ? 'filled' : ''}`}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </div>

                  <IonButton color="primary" size="small" shape="round">
                    Get an Appointment
                  </IonButton>
                </div>
              </IonCardHeader>
              <IonCardContent>
                Here's a small text description for the card content. Nothing
                more, nothing less.
              </IonCardContent>
            </IonCard>

            <div className="date-picker">
              <span>{new Date(selectedDate).toLocaleDateString()}</span>
              <IonIcon
                icon={calendarOutline}
                className="calendar-icon"
                onClick={() => setShowModal(true)}
              />
            </div>

            <IonModal
              id="example-modal"
              isOpen={showModal}
              onDidDismiss={() => setShowModal(false)}
            >
              <IonToolbar>
                <IonTitle>Modal</IonTitle>
                <IonButtons slot="end">
                  <IonButton color="medium" onClick={() => setShowModal(false)}>
                    Set the date
                  </IonButton>
                </IonButtons>
              </IonToolbar>

              <IonContent>
                <IonDatetime
                  presentation="date"
                  value={selectedDate}
                  onIonChange={handleDateChange}
                  className="calendar"
                />
              </IonContent>
            </IonModal>
            
            <div className="time-selection">
                  <div className="time-block">
                    <h3>Morning</h3>
                    {['8:00 AM', '9:00 AM', '10:00 AM'].map((time) => (
                      <IonButton
                        key={time}
                        color={selectedTime === time ? 'success' : 'light'}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </IonButton>
                    ))}
                  </div>

                  <div className="time-block">
                    <h3>Afternoon</h3>
                    {['3:00 PM', '4:00 PM', '5:00 PM'].map((time) => (
                      <IonButton size="default"
                        key={time}
                        color={selectedTime === time ? 'success' : 'light'}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </IonButton>
                    ))}
                  </div>

                  <div className="time-block">
                    <h3>Evening</h3>
                    {['6:00 PM', '7:00 PM', '8:00 PM'].map((time) => (
                      <IonButton
                        key={time}
                        color={selectedTime === time ? 'success' : 'light'}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </IonButton>
                    ))}
                  </div>
                </div>  
                <div className="container3">
                  <div className="container3-text-overlay">Stay safe,Health for us</div>
                </div>
       
          
          
          </>
        ) : (
          <div>Loading...</div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;
