import { CheckSquareFilled, FlagFilled, IdcardFilled, MailFilled, ProfileFilled, ReconciliationFilled } from '@ant-design/icons';
import { Steps } from 'antd';
import "./internshForm.css"

const InternshipStatus = () => (
  <Steps
    items={[
      {
        title: 'Staj Seçimi',
        //description: 'Yapılacak olan staj çeşidi seçme',
        status: 'finish',
        icon: <ProfileFilled />
      },
      {
        title: 'Staj İlkeleri',
        //description: 'Staj uygulama ilkeleri onayı verme',
        status: 'process',
        icon: <CheckSquareFilled />
      },
      {
        title: 'Şirket Bilgileri',
        //description: 'Staj yapılacak şirket bilgilerini girme',
        status: 'wait',
        icon: <MailFilled />
      },
      {
        title: 'Şirket Onayı',
        //description: 'Şirket tarafından stajın onaylanma durumu',
        status: 'wait',
        icon: <IdcardFilled />
      },
      {
        title: 'Danışman Onayı',
        //description: 'Üniversitenin stajı onaylama durumu',
        status: 'wait',
        icon: <ReconciliationFilled />
      },
      {
        title: 'Tamamlandı',
        //description: 'Staj başvurusu başarıyla tamamlandı',
        status: 'wait',
        icon: <FlagFilled />
      }
    ]}
  />
);
export default InternshipStatus;
