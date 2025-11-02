import cardStyles from './UserCard.module.css'
const UserCard = ({ userData }) => {
    // console.log(userData)

    return (
        <div className={cardStyles.card}>
            <div>
                <h6>Candidate</h6>
                <h2>{userData?.Surname} {userData['Other Names']}</h2>
            </div>

            <div className="">
                <h6>Position applied </h6>
                <h3>{userData['Position Applying for']}</h3>
            </div>

            <div className="">
                <h6>Gender</h6>
                <h3>{userData?.Gender}  </h3>
            </div>

<div className="">
    <p>Date Applied - <span>{new Date(userData.Timestamp).toLocaleString('en-US', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}</span></p>
</div>
            <button>View Details</button>
        </div>
    )
}

export default UserCard
