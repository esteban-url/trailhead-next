import {useIdentityContext} from 'react-netlify-identity-gotrue';
import {useEffect} from 'react';
import {useRouter} from 'next/router';

export default function useIdentityRedirects() {
  const router = useRouter();
  const identity = useIdentityContext();

  useEffect(() => {
    switch (identity.urlToken?.type) {
      case 'confirmation':
        router.push(`/user/profile`);
        break;
      case 'invite':
        break;
      case 'email_change':
        break;
      case 'recovery':
        router.push(`/user/reset-password/`);
        break;

      default:
        break;
    }
  }, [identity.urlToken]);
}
