import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import GitHubButton from 'react-github-btn'

import ItemList from '../../components/ItemList'
import useMousePosition from '../../lib/useMousePosition'
import { RarityBox } from '../../components/RarityBox'
import ExpansionToggle from '../../components/ExpansionToggle'
import {
  container,
  flex,
  flexColumn,
  flexSpaceAround,
  heading,
  paragraph,
  link,
} from '../../styles/theme.css'
import {
  hoverBox,
  hoverBoxTitle,
  hoverBoxDescription,
} from '../../styles/HoverBox.css'

const rarities = [
  'Common',
  'Uncommon',
  'Legendary',
  'Boss',
  'Lunar',
  'Equipment',
  'Void',
]

const HoverBox = ({ item }) => {
  const { x, y } = useMousePosition()
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const isTouchDevice =
      'ontouchstart' in window &&
      window.matchMedia('(pointer: coarse)').matches
    setIsMobile(isTouchDevice)
  }, [])

  if (!item || !isClient) {
    return null
  }

  const tooltipStyle = isMobile
    ? {
        position: 'fixed' as const,
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        maxWidth: '90vw',
      }
    : {
        top: (y ?? 0) > window.innerHeight - 150 ? (y ?? 0) - 120 : (y ?? 0) + 5,
        left: (x ?? 0) + 5,
      }

  return (
    <div
      className={hoverBox}
      style={tooltipStyle}
      onMouseEnter={(e) => {
        e.preventDefault()
      }}
      onMouseLeave={(e) => {
        e.preventDefault()
      }}
    >
      <div className={hoverBoxTitle}>{item.name}</div>
      <div className={hoverBoxDescription}>{item.description}</div>
    </div>
  )
}

export const Route = createFileRoute('/items/$rarity')({
  component: RarityPage,
})

function RarityPage() {
  const { rarity } = Route.useParams()
  const navigate = useNavigate()
  const [hoveredItem, setHoveredItem] = useState<any>(null)
  const [enabledExpansions, setEnabledExpansions] = useState({
    base: true,
    'Survivors of the Void': true,
    'Seekers of the Storm': true,
  })

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (hoveredItem && !e.target.closest('[data-item-container]')) {
        setHoveredItem(null)
      }
    }

    if ('ontouchstart' in window) {
      document.addEventListener('touchstart', handleClickOutside)
      return () =>
        document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [hoveredItem])

  useEffect(() => {
    const keydownHandler = (e) => {
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        return
      }

      const nextRarity = rarities.indexOf(rarity) + 1
      const prevRarity = rarities.indexOf(rarity) - 1

      if (e.key === 'ArrowRight') {
        if (nextRarity < rarities.length) {
          navigate({ to: '/items/$rarity', params: { rarity: rarities[nextRarity] } })
        }
      }

      if (e.key === 'ArrowLeft') {
        if (prevRarity >= 0) {
          navigate({ to: '/items/$rarity', params: { rarity: rarities[prevRarity] } })
        }
      }
    }

    window.addEventListener('keydown', keydownHandler)

    return () => {
      window.removeEventListener('keydown', keydownHandler)
    }
  }, [rarity, navigate])

  const capitalizedRarity = rarity
    ? rarity.charAt(0).toUpperCase() + rarity.slice(1)
    : ''
  const title = capitalizedRarity
    ? `${capitalizedRarity} Items - Risk of Rain 2 | ror.tk.gg`
    : 'Risk of Rain 2 Items | ror.tk.gg'
  const description = capitalizedRarity
    ? `A complete list of all ${capitalizedRarity} items in Risk of Rain 2. Find all ${capitalizedRarity} items and view their stats and effects.`
    : 'A complete list of all Risk of Rain 2 items. Find items by rarity and view their stats and effects.'

  useEffect(() => {
    document.title = title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', description)
  }, [title, description])

  return (
    <div className={container} style={{ padding: '1rem' }}>
      <div
        className={flex}
        style={{
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
          marginBottom: '20px',
        }}
      >
        <div className={flex}>
          {rarities.map((r) => (
            <RarityBox key={r} rarity={r} active={rarity} />
          ))}
        </div>
        <div>
          <ExpansionToggle onExpansionChange={setEnabledExpansions} />
        </div>
      </div>
      <div className={flexSpaceAround}>
        <div
          className={flexColumn}
          style={{
            alignContent: 'center',
            width: 'min-content',
            justifyContent: 'space-around',
          }}
        >
          <h1 className={heading}>What is your Command?</h1>
          <HoverBox item={hoveredItem} />
          <div>
            <ItemList
              rarity={rarity}
              setHoveredItem={setHoveredItem}
              enabledExpansions={enabledExpansions}
            />
          </div>
        </div>
      </div>
      <div className={flexSpaceAround}>
        <div style={{ padding: '4px', textAlign: 'center' }}>
          <p className={paragraph} style={{ marginBottom: '10px' }}>
            By{' '}
            <a href="https://bsky.app/profile/tk.gg" className={link}>
              @MattieTK
            </a>{' '}
            and{' '}
            <a href="https://bsky.app/profile/hutch.tf" className={link}>
              @chrishutchinson
            </a>
          </p>

          <GitHubButton
            href="https://github.com/MattieTK/ror.tk.gg"
            data-icon="octicon-star"
            aria-label="Star MattieTK/ror.tk.gg on GitHub"
          >
            Star
          </GitHubButton>
        </div>
      </div>
    </div>
  )
}
