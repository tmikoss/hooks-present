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
    <Hero>mazākas izmaiņas, mazāka vēlme visu likt vienā komponentā</Hero>
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
    <Heading>useEffect</Heading>
    <Text>componentWillUnmount</Text>

    <Stepper values={[[6, 9], [8, 8]]}>
      {value => {
        const [start, end] = value || []
        return <CodePane highlightStart={start} highlightEnd={end} autoFillHeight={true}>
          {`import { useEffect } from 'react'

const Pokemon = ({ name }) => {
  const [data, setData] = useState(undefined)

  useEffect(() => {
    const unsubscribe = subscribeToPokemon(name, data => setData(data))
    return unsubscribe
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

  <Slide>
    <Heading>useRef</Heading>
    <Text>ye olde write only variable</Text>

    <Stepper values={[[4, 4], [10, 10], [7, 7]]}>
      {value => {
        const [start, end] = value || []
        return <CodePane highlightStart={start} highlightEnd={end} autoFillHeight={true}>
          {`import { useRef, useEffect } from 'react'

const ReportedImage = ({ src }) => {
  const clickCount = useRef(0)

  useEffect(() => {
    return () => reportToAnalytics({ src, clicks: clickCount.current })
  }, [src])

  return <img src={src} onClick={() => clickCount.current += 1} />
}`}
        </CodePane>
      }}
    </Stepper>
  </Slide>

  <Slide>
    <Heading>useRef</Heading>
    <Text>DOM bakstīšana</Text>

    <Stepper values={[[4, 4], [10, 10], [7, 7]]}>
      {value => {
        const [start, end] = value || []
        return <CodePane highlightStart={start} highlightEnd={end} autoFillHeight={true}>
          {`import { useRef, useLayoutEffect } from 'react'

const FocusedInput = (props) => {
  const inputElement = useRef()

  useLayoutEffect(() => {
    inputElement.current.focus()
  })

  return <input ref={ref} {...props} />
}`}
        </CodePane>
      }}
    </Stepper>
  </Slide>

  <Slide>
    <Heading>useReducer</Heading>
    <Text>mans primais redux</Text>

    <Stepper values={[[3, 12], [15, 18], [16, 16], [17, 17], [22, 23]]}>
      {value => {
        const [start, end] = value || []
        return <CodePane highlightStart={start} highlightEnd={end} autoFillHeight={true}>
          {`import { useReducer } from 'react'

const reducer(state, action) => {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1}
    case 'decrement':
      return {count: state.count - 1}
    default:
      return state
  }
}

const Counter = () => {
  const [{ count }, dispatch] = useReducer(
    reducer,
    { count: 0 }
  )

  return <>
    {count}
    <button onClick={() => dispatch({type: 'increment'})}>+</button>
    <button onClick={() => dispatch({type: 'decrement'})}>-</button>
  </>
}`}
        </CodePane>
      }}
    </Stepper>
  </Slide>

  <Slide>
    <Hero>yarn install hook</Hero>
  </Slide>

  <Slide>
    <Heading>react-redux</Heading>
    <Text>aizvieto `connect` HOC</Text>

    <CodePane autoFillHeight={true}>
      {`import { useSelector, useDispatch } from 'react-redux'

const Counter = () => {
  const count = useSelector(state => state.count)
  const dispatch = useDispatch()

  return <>
    {count}
    <button onClick={() => dispatch({type: 'increment'})}>+</button>
    <button onClick={() => dispatch({type: 'decrement'})}>-</button>
  </>
}`}
    </CodePane>
  </Slide>

  <Slide>
    <Heading>@apollo/client</Heading>
    <CodePane autoFillHeight={true}>
      {`import { useQuery, gql } from '@apollo/client'

const GET_PRICE = gql\`
  query($productId: Int!) {
    productPrice(id: $productId) {
      base, discount, tax
    }
  }
\`

const ProductPrice = ({ id }) => {
  const { loading, data } = useQuery(GET_PRICE, { variables: { productId: id } })

  if (loading) {
    return <div>loading...</div>
  }

  const { base, discount, tax } = data

  return <div>price: {base - discount}€, tax: {tax}</div>
}`}
    </CodePane>
  </Slide>

  <Slide>
    <Heading>react-router-dom</Heading>
    <CodePane autoFillHeight={true}>
      {`import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

const Page = () => {
  const { id } = useParams()
  const history = useHistory()
  const match = useRouteMatch('/page/1337')

  return <div>
    id from URL: {id}
    <button onClick={() => history.push('/')}>go home</button>
    {match && "you are the 100,000th visitor today!!!!"}
  </div>
}`}
    </CodePane>
  </Slide>

  <Slide>
    <Heading>react-intersection-observer</Heading>
    <CodePane autoFillHeight={true}>
      {`import { useInView } from 'react-intersection-observer'

const Order = ({ id, number }) => {
  const [ref, inView] = useInView()
  const [orderItems, setOrderItems] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch(\`/api/order/\${id}\`).then(data => {
      setOrderItems(data)
      setLoaded(true)
    })
  }, [inView, loaded])

  return <div ref={ref}>
    Order {number}:
    <ul>{orderItems.map(oi => <li key={oi}>{oi}</li>)}</ul>
  </div>
}`}
    </CodePane>
  </Slide>

  <Slide>
    <Heading>hook^hook </Heading>
    <CodePane autoFillHeight={true}>
      {`import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const usePageView = () => {
  const location = useLoacation()
  useEffect(() => sendToAnalytics(location), [location])
}

const PageA = () => {
  usePageView()

  return <div>A</div>
}

const PageB = () => {
  usePageView()

  return <div>B</div>
}`}
    </CodePane>
  </Slide>

  <Slide>
    <FlexBox alignItems='center' height='100%' flexDirection='column'>
      <Heading>more hooks more hooks</Heading>
      <Text>https://github.com/rehooks/awesome-react-hooks</Text>
    </FlexBox>
  </Slide>
</Deck>

export default App
