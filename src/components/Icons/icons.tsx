import DownloadIcon from '../../../public/Icons/Download.png';
import CRVinosIcon from '../../../public/Icons/CRVinos.png';
import FacebookIcon from '../../../public/Icons/Facebook.png';
import InstagramIcon from '../../../public/Icons/Instagram.png';
import { StaticImageData } from 'next/image';

interface Icons {
  [key: string]: StaticImageData;
}

const icons: Icons = {
  download: DownloadIcon,
  crvinos: CRVinosIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
};

export default icons;