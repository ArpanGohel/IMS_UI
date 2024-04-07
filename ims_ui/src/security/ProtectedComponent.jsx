import { useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { useEffect, useState } from 'react';

function ProtectedComponent({ children }) {
  const { user, isLoading, signinRedirect } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate('/');
      } else {
        setLoading(false);
      }
    }
  }, [isLoading, user, signinRedirect]);

  if (loading) {
    return null; // or a loading spinner
  }

  return children;
}

export default ProtectedComponent;