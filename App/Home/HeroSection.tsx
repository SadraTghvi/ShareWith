import React, { FC, useEffect, useState } from 'react'

import { useAtomValue } from 'jotai'
import { HeroImgAtom } from 'state'

import './style/homehero.scss'

const HeroSection = () => {
    const HeroImg = useAtomValue(HeroImgAtom)

    return (
        <section className='hero-section'>
            <HeroSectionImg imgs={HeroImg} />

            <div className='hero-titles'>
                <div className='titles-wrapper'>
                    <div className='title_hero brand'>
                        {'Share With.'.split(' ').map((word, index) => (
                            <span
                                key={index}
                                className='hero-word'
                                style={{
                                    animationDelay: `${200 * index}ms`,
                                }}
                            >
                                {word}{' '}
                            </span>
                        ))}
                    </div>
                    <div className='title second'>
                        {'Share Your Purest Moments With Others'
                            .split(' ')
                            .map((word, index) => (
                                <span
                                    key={index}
                                    className='hero-word'
                                    style={{
                                        animationDelay: `${
                                            200 * index + 450
                                        }ms`,
                                    }}
                                >
                                    {word}{' '}
                                </span>
                            ))}
                    </div>
                    <div className='title_small last'>
                        {'Sign Up Now And Explore'
                            .split(' ')
                            .map((word, index) => (
                                <span
                                    key={index}
                                    className='hero-word'
                                    style={{
                                        animationDelay: `${
                                            200 * index + 2000
                                        }ms`,
                                    }}
                                >
                                    {word}{' '}
                                </span>
                            ))}
                    </div>
                </div>
                <div className='cta-wrapper'>
                    <button
                        className='main-cta title_small'
                        style={{ animationDelay: '3.5s' }}
                    >
                        Sign Up
                    </button>
                    <button
                        className='other-cta title_small'
                        style={{ animationDelay: '3.75s' }}
                    >
                        {' '}
                        Explore
                    </button>
                </div>
            </div>
        </section>
    )
}

interface HeroSectionImg {
    imgs: string[]
}

const HeroSectionImg: FC<HeroSectionImg> = ({ imgs }) => {
    const [ActiveImg, setActiveImg] = useState(0)

    useEffect(() => {
        const StartTimer = setTimeout(() => {
            setInterval(() => {
                setActiveImg(activeImgValue => {
                    if (imgs[activeImgValue + 1]) {
                        return activeImgValue + 1
                    } else {
                        return 0
                    }
                })
            }, 3000)
        }, 6000)

        return () => clearInterval(StartTimer)
    }, [imgs])

    return (
        <div className='hero-bg-wrapper'>
            {imgs.map((_, index) => {
                return (
                    <img
                        className={`hero-bg ${
                            ActiveImg === index
                                ? 'active'
                                : '' || ActiveImg + 1 === index
                                ? 'next'
                                : ''
                        }`}
                        key={index}
                        src={imgs[index]}
                    />
                )
            })}
        </div>
    )
}

export default HeroSection
