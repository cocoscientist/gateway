const ROUTES = [
    {
        url: '/games',
        proxy: {
            target: "https://www.cheapshark.com/api/1.0/games",
            changeOrigin: true
        }
    }
]

exports.ROUTES = ROUTES