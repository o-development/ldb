import { SolidProfileShapeType } from '../../.ldo/profile.shapeTypes';
import { ResourceViewConfig } from '../../components/ResourceView';
import { User } from 'lucide-react-native';
import { ProfileView } from './ProfileView';

export const ProfileResourceView: ResourceViewConfig = {
  name: 'profile',
  displayName: 'Profile',
  displayIcon: User,
  view: ProfileView,
  canDisplay: (targetUri, targetResource, dataset) => {
    const profile = dataset
      .usingType(SolidProfileShapeType)
      .fromSubject(targetUri);

    return !!profile?.type?.some?.(
      (val) => val['@id'] === 'Person' || val['@id'] === 'Person2',
    );
  },
};
