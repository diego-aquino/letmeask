import { FC, useEffect, useState } from 'react';

import { LoadingIcon, Logo } from '~/assets/icons';
import { useMount } from '~/hooks';

import { LoadingOverlay } from './styles';

interface Props {
  loading: boolean;
}

const PageWithLoading: FC<Props> = ({ loading, children }) => {
  const isMounted = useMount();
  const [loadingOverlayIsHidden, setLoadingOverlayIsHidden] = useState(
    !loading,
  );

  useEffect(() => {
    if (loading) {
      setLoadingOverlayIsHidden(false);
    }
  }, [loading]);

  const handleLoadingOverlayTransitionEnd = () => {
    setTimeout(() => {
      if (!isMounted.current) return;
      setLoadingOverlayIsHidden(true);
    }, 100);
  };

  return (
    <>
      <LoadingOverlay
        $active={loading}
        $hidden={loadingOverlayIsHidden}
        aria-hidden={loadingOverlayIsHidden}
        onTransitionEnd={handleLoadingOverlayTransitionEnd}
      >
        <Logo />
        <LoadingIcon />
      </LoadingOverlay>

      {!loading && children}
    </>
  );
};

export default PageWithLoading;
