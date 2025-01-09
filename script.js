async function fetchGitHubProfile() {
    const username = document.getElementById('username').value.trim();
    const profileDiv = document.getElementById('profile');
    const errorDiv = document.getElementById('error');
    
    // Clear previous data
    profileDiv.innerHTML = '';
    errorDiv.innerHTML = '';

    if (!username) {
        errorDiv.innerHTML = 'Please enter a GitHub username.';
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error('User not found');
        }

        const data = await response.json();
        profileDiv.innerHTML = `
            <h2>${data.name || data.login}</h2>
            <img src="${data.avatar_url}" alt="${data.login}'s avatar" width="150">
            <p><strong>Followers:</strong> ${data.followers}</p>
            <p><strong>Following:</strong> ${data.following}</p>
            <p><strong>Public Repos:</strong> ${data.public_repos}</p>
            <p><strong>Bio:</strong> ${data.bio || 'No bio available'}</p>
        `;
    } catch (error) {
        errorDiv.innerHTML = error.message;
    }
}