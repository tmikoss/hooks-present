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
</Deck>

export default App

/*

# builtIn hooks

---

* useState

---

* useContext

---
* useEffect
  * useLayoutEffect
---
* useCallback
  * definīcija
---
* useRef
---

* useMemo
  * iepriekšējās vērtības tiek cached?
  * komponenti

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
