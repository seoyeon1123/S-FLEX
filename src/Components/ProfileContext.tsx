import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

// 프로필 타입 정의
interface IProfil {
  name: string;
  email: string;
}

// Context 상태와 업데이트 함수를 포함하는 타입 정의
interface ProfileContextType {
  profil: IProfil | null;
  setProfil: (profil: IProfil | null) => void;
}

// 초기 Context 상태
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Custom hook for using ProfileContext
export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

// Provider 컴포넌트 정의
interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profil, setProfil] = useState<IProfil | null>(() => {
    // 페이지 로딩 시 로컬 스토리지에서 프로필 정보 불러오기
    const storedProfile = localStorage.getItem('profile');
    return storedProfile ? JSON.parse(storedProfile) : null;
  });

  // 프로필이 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profil));
  }, [profil]);

  return (
    <ProfileContext.Provider value={{ profil, setProfil }}>
      {children}
    </ProfileContext.Provider>
  );
};
