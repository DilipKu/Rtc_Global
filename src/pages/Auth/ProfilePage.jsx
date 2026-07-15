import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, LogOut, ChevronRight } from 'lucide-react';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>My Account</h1>
          <p className={styles.subtitle}>Manage your profile and settings</p>
        </div>
      </header>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.profileCard}>
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>
                <User size={48} />
              </div>
              <div>
                <h2 className={styles.name}>{user.user_metadata?.full_name || 'User'}</h2>
                <p className={styles.email}>{user.email}</p>
              </div>
            </div>

            <div className={styles.actionsSection}>
              <button className={styles.actionBtn}>
                <span>Order History</span>
                <ChevronRight size={16} />
              </button>
              <button className={styles.actionBtn}>
                <span>Account Settings</span>
                <ChevronRight size={16} />
              </button>
              
              <button className={styles.logoutBtn} onClick={handleLogout}>
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
