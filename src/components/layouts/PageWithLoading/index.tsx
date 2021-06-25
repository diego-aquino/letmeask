import { FC, useEffect, useState } from 'react';

import { LoadingIcon, Logo } from '~/assets/icons';

import { LoadingOverlay } from './styles';

interface Props {
  loading: boolean;
}

const PageWithLoading: FC<Props> = ({ loading, children }) => {
  const [loadingOverlayIsHidden, setLoadingOverlayIsHidden] = useState(
    !loading,
  );

  useEffect(() => {
    if (loading) {
      setLoadingOverlayIsHidden(false);
    }
  }, [loading]);

  const handleLoadingOverlayTransitionEnd = () => {
    setLoadingOverlayIsHidden(true);
  };

  return (
    <>
      <LoadingOverlay
        active={loading}
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
