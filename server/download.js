import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoUrl = "https://www.youtube.com/shorts/" + videoId
    console.log("Realizando o download do video:", videoId)
    ytdl(videoUrl, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        if (seconds > 60) {
          throw new Error("Duração do video é maior que 60 segundos")
        }
      })
      .on("end", () => {
        console.log("Download do video finalizado")
        resolve()
      })
      .on("error", (error) => {
        console.log("Não foi possivel realizar o download do video", error)
        reject()
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
