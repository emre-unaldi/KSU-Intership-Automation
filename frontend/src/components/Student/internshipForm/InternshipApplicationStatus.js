import { CheckSquareFilled, FlagFilled, IdcardFilled, MailFilled, ProfileFilled, ReconciliationFilled } from '@ant-design/icons';
import { Steps } from 'antd';
const InternshipStatus = () => (
  <Steps
    items={[
      {
        title: 'Seçim',
        description: 'Yapılacak olan staj çeşidi seçme',
        status: 'process',
        icon: <ProfileFilled />
      },
      {
        title: 'İlkeler',
        description: 'Staj uygulama ilkeleri onayı verme',
        status: 'wait',
        icon: <CheckSquareFilled />
      },
      {
        title: 'Şirket',
        description: 'Staj yapılacak şirket bilgilerini girme',
        status: 'wait',
        icon: <MailFilled />
      },
      {
        title: 'Şirket Onayı',
        description: 'Şirket tarafından stajın onaylanma durumu',
        status: 'wait',
        icon: <IdcardFilled />
      },
      {
        title: 'Danışman Onayı',
        description: 'Üniversitenin stajı onaylama durumu',
        status: 'wait',
        icon: <ReconciliationFilled />
      },
      {
        title: 'Tamamlandı',
        description: 'Staj başvurusu başarıyla tamamlandı',
        status: 'wait',
        icon: <FlagFilled />
      }
    ]}
  />
);
export default InternshipStatus;
