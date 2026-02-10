import { nanoid } from "nanoid"
import { useEffect, useState } from "react"

const FRUITS = ["apple","banana","orange","strawberry","mango","pineapple","grape","watermelon","blueberry","raspberry","kiwi","peach","pear","plum","cherry","pomegranate","papaya","cantaloupe","fig","guava","lychee","apricot","blackberry","coconut","dragonfruit","passionfruit","tangerine","nectarine","mandarin","persimmon","cranberry"]

const STORAGE_KEY = "chat_username"

const generateUsername = () => {
  const word = FRUITS[Math.floor(Math.random() * FRUITS.length )]
  return `ananymous-${word}-${nanoid(4)}`
}



export const useUsername = () => {
     const [username, setUsername] = useState("")

     useEffect(() => {
         const main = () => {
           const stored = localStorage.getItem(STORAGE_KEY)
     
           if (stored){
             setUsername(stored);
             return
           }
     
           const generated = generateUsername()
           localStorage.setItem(STORAGE_KEY, generated)
           setUsername(generated)
     
         }
         main()
       }, [])

       return {username}
}