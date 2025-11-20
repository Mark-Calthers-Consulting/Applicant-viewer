import cardStyles from './UserCard.module.css'
import { User, Briefcase, Calendar } from 'lucide-react';

const UserCard = ({ userData }) => {
    return (
        <div className={cardStyles.card}>
            <div className={cardStyles.header}>
                <div className={cardStyles.avatar}>
                    <User size={28} />
                </div>
                <div className={cardStyles.nameSection}>
                    <span className={cardStyles.label}>Candidate</span>
                    <h2 className={cardStyles.name}>{userData?.Surname} {userData['Other Names']}</h2>
                </div>
            </div>

            <div className={cardStyles.content}>
                <div className={cardStyles.infoRow}>
                    <div className={cardStyles.iconWrapper}>
                        <Briefcase size={18} />
                    </div>
                    <div className={cardStyles.infoContent}>
                        <span className={cardStyles.infoLabel}>Position</span>
                        <p className={cardStyles.infoValue}>{userData['Position Applying for']}</p>
                    </div>
                </div>

                <div className={cardStyles.metaRow}>
                    <div className={cardStyles.metaItem}>
                        <span className={cardStyles.metaLabel}>Gender</span>
                        <span className={cardStyles.metaValue}>{userData?.Gender}</span>
                    </div>
                    <div className={cardStyles.metaItem}>
                        <Calendar size={14} />
                        <span className={cardStyles.dateText}>
                            {new Date(userData.Timestamp).toLocaleString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </span>
                    </div>
                </div>
            </div>

            <button className={cardStyles.viewButton}>View Details</button>
        </div>
    )
}

export default UserCard
