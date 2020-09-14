import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="mainPage">
      <Link href="/content"><a><img src="/netflix.png" width="190px" /></a></Link>
      <style jsx>{`
          .mainPage{
            background-color:black;
            color:white;
            height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
          }
      `}</style>
    </div>
  )
}
