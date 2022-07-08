import Header from "../elements/Header"
const Main = ({children}) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  )
}

export default Main