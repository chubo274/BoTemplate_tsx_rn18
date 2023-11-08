export interface IPath {
    path: string,
    mime: string,
    category: 'audio' | 'image' | 'video' | 'application' | 'font' | 'text'
    description?: string,
}
const listPath: IPath[] = [
    { path: `aac`, mime: `audio/aac`, category: 'audio', description: `AAC audio` },
    { path: `abw`, mime: `application/x-abiword`, category: 'application', description: `AbiWord document` },
    { path: `arc`, mime: `application/x-freearc`, category: 'application', description: `Archive document (multiple files embedded)` },
    { path: `avif`, mime: `image/avif`, category: 'image', description: `AVIF image` },
    { path: `avi`, mime: `video/x-msvideo`, category: 'video', description: `AVI: Audio Video Interleave` },
    { path: `azw`, mime: `application/vnd.amazon.ebook`, category: 'application', description: `Amazon Kindle eBook format` },
    { path: `bin`, mime: `application/octet-stream`, category: 'application', description: `Any kind of binary data` },
    { path: `bmp`, mime: `image/bmp`, category: 'image', description: `Windows OS/2 Bitmap Graphics` },
    { path: `bz,`, mime: `application/x-bzip`, category: 'application', description: `BZip archive` },
    { path: `bz2`, mime: `application/x-bzip2`, category: 'application', description: `BZip2 archive` },
    { path: `cda`, mime: `application/x-cdf`, category: 'application', description: `CD audio` },
    { path: `csh`, mime: `application/x-csh`, category: 'application', description: `C-Shell script` },
    { path: `css`, mime: `text/css`, category: 'text', description: `Cascading Style Sheets (CSS)` },
    { path: `csv`, mime: `text/csv`, category: 'text', description: `Comma-separated values (CSV)` },
    { path: `doc`, mime: `application/msword`, category: 'application', description: `Microsoft Word` },
    { path: `docx`, mime: `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, category: 'application', description: `Microsoft Word (OpenXML)` },
    { path: `eot`, mime: `application/vnd.ms-fontobject`, category: 'application', description: `MS Embedded OpenType fonts` },
    { path: `epub`, mime: `application/epub+zip`, category: 'application', description: `Electronic publication (EPUB)` },
    { path: `gz`, mime: `application/gzip`, category: 'application', description: `GZip Compressed Archive` },
    { path: `gif`, mime: `image/gif`, category: 'image', description: `Graphics Interchange Format (GIF)` },
    { path: `htm`, mime: `text/html`, category: 'text', description: `HyperText Markup Language (HTML)` },
    { path: `html`, mime: `text/html`, category: 'text', description: `HyperText Markup Language (HTML)` },
    { path: `heic`, mime: `image/heic`, category: 'image', description: `Output image of Iphone` },
    { path: `heif`, mime: `image/heif`, category: 'image', description: `Output image of Iphone` },
    { path: `ico`, mime: `image/vnd.microsoft.icon`, category: 'image', description: `Icon format` },
    { path: `ics`, mime: `text/calendar`, category: 'text', description: `iCalendar format` },
    { path: `jar`, mime: `application/java-archive`, category: 'application', description: `Java Archive (JAR)` },
    { path: `jpeg`, mime: `image/jpeg`, category: 'image', description: `JPEG images` },
    { path: `jpg`, mime: `image/jpeg`, category: 'image', description: `JPEG images` },
    { path: `js`, mime: `text/javascript`, category: 'text', description: `JavaScript` },
    { path: `json`, mime: `application/json`, category: 'application', description: `JSON format` },
    { path: `jsonld`, mime: `application/ld+json`, category: 'application', description: `JSON-LD format` },
    { path: `mid`, mime: `audio/midi`, category: 'audio', description: `Musical Instrument Digital Interface (MIDI)` },
    { path: `midi`, mime: `audio/x-midi`, category: 'audio', description: `Musical Instrument Digital Interface (MIDI)` },
    { path: `mov`, mime: `video/quicktime`, category: 'video', description: `Output video of Iphone` },
    { path: `mjs`, mime: `text/javascript`, category: 'text', description: `JavaScript module` },
    { path: `mp3`, mime: `audio/mpeg`, category: 'audio', description: `MP3 audio` },
    { path: `mp4`, mime: `video/mp4`, category: 'video', description: `MP4 video` },
    { path: `mpeg`, mime: `video/mpeg`, category: 'video', description: `MPEG Video` },
    { path: `mpkg`, mime: `application/vnd.apple.installer+xml`, category: 'application', description: `Apple Installer Package` },
    { path: `odp`, mime: `application/vnd.oasis.opendocument.presentation`, category: 'application', description: `OpenDocument presentation document` },
    { path: `ods`, mime: `application/vnd.oasis.opendocument.spreadsheet`, category: 'application', description: `OpenDocument spreadsheet document` },
    { path: `odt`, mime: `application/vnd.oasis.opendocument.text`, category: 'application', description: `OpenDocument text document` },
    { path: `oga`, mime: `audio/ogg`, category: 'audio', description: `OGG audio` },
    { path: `ogv`, mime: `video/ogg`, category: 'video', description: `OGG video` },
    { path: `ogx`, mime: `application/ogg`, category: 'application', description: `OGG` },
    { path: `opus`, mime: `audio/opus`, category: 'audio', description: `Opus audio` },
    { path: `otf`, mime: `font/otf`, category: 'font', description: `OpenType font` },
    { path: `png`, mime: `image/png`, category: 'image', description: `Portable Network Graphics` },
    { path: `pdf`, mime: `application/pdf`, category: 'application', description: `Adobe Portable Document Format (PDF)` },
    { path: `php`, mime: `application/x-httpd-php`, category: 'application', description: `Hypertext Preprocessor (Personal Home Page)` },
    { path: `ppt`, mime: `application/vnd.ms-powerpoint`, category: 'application', description: `Microsoft PowerPoint` },
    { path: `ppts`, mime: `application/vnd.openxmlformats-officedocument.presentationml.presentation`, category: 'application', description: `Microsoft PowerPoint (OpenXML)` },
    { path: `rar`, mime: `application/vnd.rar`, category: 'application', description: `RAR archive` },
    { path: `rtf`, mime: `application/rtf`, category: 'application', description: `Rich Text Format (RTF)` },
    { path: `sh`, mime: `application/x-sh`, category: 'application', description: `Bourne shell script` },
    { path: `svg`, mime: `image/svg+xml`, category: 'image', description: `Scalable Vector Graphics (SVG)` },
    { path: `tar`, mime: `application/x-tar`, category: 'application', description: `Tape Archive (TAR)` },
    { path: `tif`, mime: `image/tiff`, category: 'image', description: `Tagged Image File Format (TIFF)` },
    { path: `tiff`, mime: `image/tiff`, category: 'image', description: `Tagged Image File Format (TIFF)` },
    { path: `ts`, mime: `video/mp2t`, category: 'video', description: `MPEG transport stream` },
    { path: `ttf`, mime: `font/ttf`, category: 'font', description: `TrueType Font` },
    { path: `txt`, mime: `text/plain`, category: 'text', description: `Text, (generally ASCII or ISO 8859-n)` },
    { path: `vsd`, mime: `application/vnd.visio`, category: 'application', description: `Microsoft Visio` },
    { path: `wav`, mime: `audio/wav`, category: 'audio', description: `Waveform Audio Format` },
    { path: `wave`, mime: `audio/wave`, category: 'audio', description: `Waveform Audio Format` },
    { path: `weba`, mime: `audio/webm`, category: 'audio', description: `WEBM audio` },
    { path: `webm`, mime: `video/webm`, category: 'video', description: `WEBM video` },
    { path: `webp`, mime: `image/webp`, category: 'image', description: `WEBP image` },
    { path: `woff`, mime: `font/woff`, category: 'font', description: `Web Open Font Format (WOFF)` },
    { path: `woff2`, mime: `font/woff2`, category: 'font', description: `Web Open Font Format (WOFF)` },
    { path: `xhtml`, mime: `application/xhtml+xml`, category: 'application', description: `XHTML` },
    { path: `xls`, mime: `application/vnd.ms-excel`, category: 'application', description: `Microsoft Excel` },
    { path: `xps`, mime: `application/vnd.ms-xpsdocument`, category: 'application', description: `Microsoft Excel` },
    { path: `xlsx`, mime: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`, category: 'application', description: `Microsoft Excel (OpenXML)` },
    { path: `xml`, mime: `application/xml`, category: 'application', description: `XML` },
    { path: `xul`, mime: `application/vnd.mozilla.xul+xml`, category: 'application', description: `XUL` },
    { path: `zip`, mime: `application/zip`, category: 'application', description: `ZIP archive` },
    { path: `3gp`, mime: `video/3gpp`, category: 'video', description: `3GPP audio/video container` },  // mime: `audio/3gpp`, category: 'audio'
    { path: `3g2`, mime: `video/3gpp2`, category: 'video', description: `3GPP2 audio/video container` },    // mime: `video/3gpp`, category: 'video'
    { path: `7z`, mime: `application/x-7z-compressed`, category: 'application', description: `7-zip archive` }
];

export const listPathSavetoRoll = [
    'jpg', 'jpeg', 'png', 'heif', 'heic',
    'mp4', 'mov',
]

export const listPathSavetoDocument = [
    'mp3', 'mpeg', 'wav', 'wave',
    'doc', 'docx', 'xls', 'xlsx', 'xps', 'pdf', 'csv', 'css',
]

export const filePath = (uri: string): IPath | undefined => {
    // inital
    const listPathAppSupport = [...listPathSavetoRoll, ...listPathSavetoDocument]
    const keyNotDefine = listPathAppSupport.find((key: string) => listPath.findIndex((el) => el.path == key) == -1)
    if (keyNotDefine) {
        console.error(`that key [${keyNotDefine}] was not defined in listPath`)
        return undefined
    }

    // checking
    const pathCheck = uri?.split('.')?.pop()?.toLocaleLowerCase() || ''
    const pathCheckIsSupport = listPathAppSupport.includes(pathCheck) && listPath.findIndex((el) => el.path == pathCheck) > 0
    if (pathCheckIsSupport) {
        return listPath.find((el) => el.path == pathCheck)
    } else {
        console.error(`that key [${keyNotDefine}] was not support`)
        return undefined
    }
}