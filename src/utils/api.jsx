// api.js
import { auth } from './firebaseConfig';

const getCurrentUserId = async () => {
    try {
        const user = auth.currentUser;

        if (!user) {
            throw new Error('No user is currently signed in.');
        }

        const idToken = await user.getIdToken();

        const response = await fetch('https://<your-region>-<your-project-id>.cloudfunctions.net/getCurrentUserId', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${idToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user ID');
        }

        const data = await response.json();
        return data.userId;
    } catch (error) {
        console.error('Error getting user ID:', error);
        throw error;
    }
};

export default getCurrentUserId;
