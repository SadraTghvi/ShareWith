import axios from 'axios'

import { atom } from 'jotai'

import { AllAlbum, HeroImg, LastAlbum, NavActiveType } from '../models/Locale'

const HeroImgs = atom<HeroImg>([])
const LastAlbums = atom<LastAlbum[]>([])
const AllAlbums = atom<AllAlbum>([])
const NavActive = atom<NavActiveType>(false)

const HeroImgAtom = atom(
    get => get(HeroImgs),
    async (_, set) => {
        let { data } = await axios.get('http://localhost:7000/api/herophoto/')

        set(HeroImgs, data.urls)
    }
)

const LastAlbumAtom = atom(
    get => get(LastAlbums),
    async (_, set) => {
        let { data } = await axios.get('http://localhost:7000/api/last-albums/')

        set(LastAlbums, data.lastAlbums)
    }
)

const AllAlbumsAtom = atom(
    get => get(AllAlbums),
    async (_, set) => {
        let { data } = await axios.get('http://localhost:7000/api/all-albums/')

        set(AllAlbums, data.albums)
    }
)

const NavActiveAtom = atom(
    get => get(NavActive),
    async (_, set, active: boolean) => {
        set(NavActive, active)
    }
)

export { HeroImgAtom, LastAlbumAtom, AllAlbumsAtom, NavActiveAtom }
