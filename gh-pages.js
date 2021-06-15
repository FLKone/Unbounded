var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/FLKone/Unbounded.git', // Update to point to your repository
        user: {
            name: 'FLKone', // update to use your name
            email: 'git@flk.io' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)