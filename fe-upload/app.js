import {initializeApp} from "firebase/app"
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import {upload} from './upload.js'


const firebaseConfig = {
    authDomain: "fe-upload-15b45.firebaseapp.com",
    projectId: "fe-upload-15b45",
    storageBucket: "fe-upload-15b45.appspot.com",
    messagingSenderId: "724952218388",
    appId: "1:724952218388:web:fcda0e266f019d5a23e001"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)


const storage = getStorage()


upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const storageRef = ref(storage, `images/${file.name}`)
            const task = uploadBytesResumable(storageRef, file)

            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percentage
                block.style.width = percentage
            }, error => {
                console.log(error)
            }, () => {
                getDownloadURL(task.snapshot.ref).then(url => {
                    console.log('Download URL', url)
                })
            })
        })
    }
})
