import app from "./app"
process.loadEnvFile()
const PORT = process.env.API_PORT || 4000

app.listen(PORT, () => {
    console.log(` ------ LISTEN ON PORT: ${PORT} ------ `)
})