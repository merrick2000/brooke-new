import React, { useEffect, useMemo } from "react";
import { USER_ROLE } from "../../helpers/data";
import LoadingView from "./LoadingView";
import useAuth, { setAuthHeaders } from "@/state/auth";
import { useRouter } from "next/navigation";

interface ProtectedViewProps {
  children: React.ReactNode;
  roles?: string[]; // Make sure USER_ROLE is properly imported and defined
}

const ProtectedView: React.FC<ProtectedViewProps> = ({ children, roles }) => {
  const { isLoading, user, isAuthenticated, fetchUserData } = useAuth();
  const router = useRouter();

  const canShow = useMemo(() => {
    if (roles) {
      return user?.userRole && roles?.includes(user?.userRole);
    } else {
      return true;
    }
  }, [user?.userRole, roles]);

  //fetch user Data if not done yet
  useEffect(() => {
    if (!isAuthenticated) {
      const token = sessionStorage.getItem("token");
      if (token) {
        setAuthHeaders(token);
        fetchUserData();
      }
    }
  }, [fetchUserData, isAuthenticated]);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !canShow)) {
      router.push("/connexion");
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/connexion");
    }
  }, [isAuthenticated, isLoading, router, canShow]);

  /*  console.log({
    canShow,
    roles,
    userRoles: user?.userRole,
    isAuthenticated,
    isLoading,
  }); */

  return <>{user ? canShow ? <>{children}</> : null : <LoadingView />}</>;
};

export const ProtectedByRole: React.FC<ProtectedViewProps> = ({
  children,
  roles,
}) => {
  const router = useRouter();

  const { user } = useAuth();

  const canShow = useMemo(() => {
    if (user?.userRole && roles?.includes(user?.userRole)) {
      return true;
    }
    return false;
  }, [user?.userRole, roles]);

  useEffect(() => {
    if (!canShow) {
      router.push("/connexion");
    }
  }, [canShow, router]);
  return <>{canShow && children}</>;
};

export default ProtectedView;
