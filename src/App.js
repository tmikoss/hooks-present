import React, { Fragment } from 'react'
import { Deck, Slide, Heading, FlexBox, CodePane, Text, Stepper, UnorderedList, ListItem, Appear } from 'spectacle'

const STRIKE = { textDecoration: 'line-through' }

const Hero = ({ children, ...other }) => <FlexBox alignItems='center' height='100%'>
  <Heading {...other}>{children}</Heading>
</FlexBox>

const App = () => <Deck>
  <Slide>
    <Hero>functional react + hooks</Hero>
  </Slide>

  <Slide>
    <Heading>functional components</Heading>

    <UnorderedList>
      <ListItem>React 0.14</ListItem>
      <ListItem>`props -> dom`, vizuālajiem elementiem</ListItem>
      <ListItem>"This pattern is designed to encourage the creation of these simple components that should comprise large portions of your apps."</ListItem>
    </UnorderedList>
  </Slide>

  <Slide>
    <Heading>kāpēc? mazāk koda</Heading>

    <Stepper values={[[21, 28]]}>
      {value => {
        const [start, end] = value || [1, 19]
        return <CodePane highlightStart={start} highlightEnd={end} autoFillHeight={true}>
          {`class Test extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  more() {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    const { count } = this.state

    return <div>
      hello number {count}
      <button onClick={this.more.bind(this)}>more</button>
    </div>
  }
}

const Test = () => {
  const [count, setCount] = useState(0)

  return <div>
    hello number {count}
    <button onClick={() => setCount(count + 1)}>more</button>
  </div>
}`}
        </CodePane>
      }}
    </Stepper>
  </Slide>

  <Slide>
    <Stepper values={[1, 2, 3]}>
      {value => {
        return <FlexBox alignItems='center' height='100%' flexDirection='column'>
            <Heading>
              <span style={value > 0 ? STRIKE : null}>less code</span>
              {value > 1 ? ' smaller components ' : ' '}
            more better
          </Heading>
          {value > 2 && <Text>
            jo mazāks komponents, jo vieglāk
            <UnorderedList>
              <ListItem>saprast</ListItem>
              <ListItem>refaktorēt</ListItem>
              <ListItem>atkārtoti izmantot</ListItem>
            </UnorderedList>
          </Text>}
        </FlexBox>
      }}
    </Stepper>

    <span />
  </Slide>

  <Slide>
    <Heading>React 0.14+</Heading>

    <Stepper values={[[7, 24]]}>
      {value => {
        const [start, end] = value || [1, 5]
        return <CodePane highlightStart={start} highlightEnd={end} autoFillHeight={true}>
{`const FancyImage = ({ src }) => {
  return <div className='image-container'>
    <img src={src} alt='Image' />
  </div>
}

class FancyImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { zoomed: false }
  }

  zoom() {
    this.setState({ zoomed: !this.state.zoomed })
  }

  render() {
    const { zoomed } = this.state

    return <div className='image-container' onClick=(() => setZoomed(!zoomed))>
      <img src={zoomed ? \`/2x\${src}\` : src} alt={zoomed ? 'Big Image' : 'Image'} />
    </div>
  }
}`}
        </CodePane>
      }}
    </Stepper>
  </Slide>

  <Slide>
    <Heading>React 16.8+</Heading>

    <Stepper values={[[7, 13], [8,8]]}>
      {value => {
        const [start, end] = value || [1, 5]
        return <CodePane highlightStart={start} highlightEnd={end} autoFillHeight={true}>
          {`const FancyImage = ({ src }) => {
  return <div className='image-container'>
    <img src={src} alt='Image' />
  </div>
}

const FancyImage = ({ src }) => {
  const [zoomed, setZoomed] = useState(false)

  return <div className='image-container' onClick=(() => setZoomed(!zoomed))>
    <img src={zoomed ? \`/2x\${src}\` : src} alt={zoomed ? 'Big Image' : 'Image'} />
  </div>
}`}
        </CodePane>
      }}
    </Stepper>
  </Slide>

  <Slide>
    <Hero>{"import { hook } from 'react'"}</Hero>
  </Slide>

  <Slide>
    <Heading>useState</Heading>
    <Text>ye olde variable</Text>

    <Stepper values={[[4, 7], [5, 5], [6,6], [7,7], [13,13], [11,11]]}>
      {value => {
        const [start, end] = value || []
        return <CodePane highlightStart={start} highlightEnd={end} autoFillHeight={true}>
          {`import { useState } from 'react'

const FancyImage = ({ src }) => {
  const [
    zoomed,
    setZoomed
  ] = useState(false)

  return <div
    className='image-container'
    onClick=(() => setZoomed(!zoomed))
  >
    <img src={zoomed ? \`/2x\${src}\` : src} />
  </div>
}`}
        </CodePane>
      }}
    </Stepper>
  </Slide>

  <Slide>
    <Heading>useState</Heading>
    <Text>balstoties uz iepriekšējo vērtību</Text>

    <CodePane>
{`const [_, setCount] = useState(0)
const increment = () => setCount(countWas => countWas + 1)
const decrement = () => setCount(countWas => countWas - 1)`}
    </CodePane>

    <Text>"smaga" defaultā vērtība</Text>

    <CodePane>
      {`const [count, setCount] = useState(() => calculateNthPrime(100))`}
    </CodePane>
  </Slide>

  <Slide>
    <Heading>useEffect</Heading>
    <Text>componentDidMount / componentDidUpdate</Text>

    <Stepper values={[[6, 12], [7, 11], [12, 12]]}>
      {value => {
        const [start, end] = value || []
        return <CodePane highlightStart={start} highlightEnd={end} autoFillHeight={true}>
          {`import { useEffect } from 'react'

const Pokemon = ({ name }) => {
  const [data, setData] = useState(undefined)

  useEffect(() => {
    fetch(\`https://pokeapi.co/api/v2/pokemon/\${name}\`).then(
      res => res.json()
    ).then(
      data => setData(data)
    )
  },[name])

  return <pre>{JSON.stringify(data, undefined, 2)}</pre>
}`}
        </CodePane>
      }}
    </Stepper>
  </Slide>

  <Slide>
    <Heading>useLayoutEffect</Heading>
    <Text>useEffect, bet pēc DOM izmaiņām</Text>

    <Stepper values={[[4,7]]}>
      {value => {
        const [start, end] = value || []
        return <CodePane highlightStart={start} highlightEnd={end} autoFillHeight={true}>
          {`import { useLayoutEffect } from 'react'

const MeasuredComponent = ({ children }) => {
  useLayoutEffect(() => {
    const height = document.querySelector('#container').offsetHeight
    console.log('container height', height)
  },[])

  return <div id='container'>{children}</div>
}`}
        </CodePane>
      }}
    </Stepper>

    <Appear elementNum={1}>
      <Text>...ne reizi neesmu lietojis 🤷‍♂️</Text>
    </Appear>
  </Slide>

  <Slide>
    <Heading>useContext</Heading>
    <Text>mani dati ir tur augšā</Text>

    <Stepper values={[[3, 3], [5, 11], [6, 6], [13, 17], [14, 14]]}>
      {value => {
        const [start, end] = value || []
        return <CodePane highlightStart={start} highlightEnd={end} autoFillHeight={true}>
          {`import { useContext, createContext } from 'react'

const CurrentUser = createContext(undefined)

const ParentComponent = () => {
  return <CurrentUser.Provider value={{ name: 'tmikoss' }}>
    <OtherComponent>
      <ChildComponent />
    </OtherComponent>
  </CurrentUser.Provider>
}

const ChildComponent = () => {
  const currentUser = useContext(CurrentUser)

  return <div>my name is {currentUser.name}</div>
}`}
        </CodePane>
      }}
    </Stepper>
  </Slide>

  <Slide>
    <Heading>useContext</Heading>
    <Text>izmanto tuvāko Provider</Text>

    <CodePane autoFillHeight={true}>
      {`import { useContext, createContext } from 'react'

const Theme = createContext('default')

const ParentComponent = () => {
  return <Theme.Provider value='dark'>
    <Theme.Provider value='light'>
      <ChildComponent />
    </Theme.Provider>
  </Theme.Provider>
}

const ChildComponent = () => {
  const theme = useContext(Theme) // 'light'
}`}
    </CodePane>
  </Slide>

  <Slide>
    <Heading>useMemo</Heading>
    <Text>mana aplikācija bremzē, jo daudz aprēķinu</Text>

    <Stepper values={[[3, 8], [5, 7], [8, 8]]}>
      {value => {
        const [start, end] = value || []
        return <CodePane highlightStart={start} highlightEnd={end} autoFillHeight={true}>
          {`import { useMemo } from 'react'

const Total = ({ orderItems }) => {
  const total = useMemo(() => {
    return orderItems.reduce((total, item) => {
      return total + (item.price - item.discount) * item.quantity
    }, 0)
  }, [orderItems])

  return <div>total {total}€</div>
}`}
        </CodePane>
      }}
    </Stepper>

    <Appear elementNum={3}>
      <Text>useState + useEffect</Text>
    </Appear>
  </Slide>

  <Slide>
    <Heading>useCallback</Heading>
    <Text>mana aplikācija bremzē, jo in-line funkcijas</Text>

    <Stepper values={[[6, 9], [7, 7], [8, 8],[14,16]]}>
      {value => {
        const [start, end] = value || []
        return <CodePane highlightStart={start} highlightEnd={end} autoFillHeight={true}>
          {`import { useCallback, useState } from 'react'

const ControlledInput = () => {
  const [count, setCount] = useState(0)

  const increment = useCallback(
    () => setCount(count + 1),
    [count]
  )

  const decrement = useCallback(() => setCount(count - 1),[count])

  return <>
    {count}
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
  </>
}`}
        </CodePane>
      }}
    </Stepper>
  </Slide>

  <Slide>
    <Heading>useCallback</Heading>
    <Text>kopā ar useState</Text>

    <CodePane>
      {`const [count, setCount] = useState(0)
const decrement = useCallback(() => setCount(count - 1), [count])`}
    </CodePane>

    <Text>less dependencies more better</Text>

    <CodePane>
      {`const [_, setCount] = useState(0)
const decrement = useCallback(() => setCount(count => count - 1), [])`}
    </CodePane>
  </Slide>
</Deck>

export default App

/*

# builtIn hooks

---
* useRef
---

* useReducer

---

* lib piemēri

---

  * redux
---
  * apollo
---
  * router
---
* custom hook combinations
---
* functional component best practices

---

* React.memo


*/
