import { IonContent, IonPage, IonButton, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Home.css';
import { arrowRedo } from 'ionicons/icons';

const Home: React.FC = () => {
  const history = useHistory();

  const handleGoWithoutRegister = () => {
    history.push('/home_doctors');
  };

  return (
    <IonPage>
      <IonContent className="home-content">
        <div className="image-container">
          <img src="/assets/images/a.png" alt="A PNG" className="center-image" />
          <p className="description">Health for us</p>

          <div className="button-container">
            <IonButton className="login-button" shape="round" color="danger">
              Log in
            </IonButton>

            <IonButton className="createaccount-button" shape="round" fill="outline">
              Create account
            </IonButton>

            <IonButton size="small" fill="clear" className="go-button" onClick={handleGoWithoutRegister}>
              go without register
              <IonIcon slot="end" icon={arrowRedo}></IonIcon>
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
