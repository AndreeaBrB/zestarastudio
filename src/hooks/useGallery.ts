"use client"

import { useState, useEffect } from "react"

export interface GalleryItem {
    id: string
    type: 'image' | 'story' | 'music' | 'animation' | 'voice'
    title: string
    url?: string // For media
    content?: string // For stories
    preview?: string // For stories
    createdAt: number
}

const STORAGE_KEY = "zestara_gallery"

export function useGallery() {
    const [items, setItems] = useState<GalleryItem[]>([])

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                setItems(JSON.parse(stored))
            } catch (e) {
                console.error("Failed to parse gallery items", e)
            }
        }
    }, [])

    const addItem = (item: Omit<GalleryItem, "id" | "createdAt">) => {
        const newItem: GalleryItem = {
            ...item,
            id: crypto.randomUUID(),
            createdAt: Date.now()
        }

        const updated = [newItem, ...items]
        setItems(updated)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        return newItem
    }

    const getItemsByType = (type: GalleryItem['type']) => {
        return items.filter(item => item.type === type)
    }

    return {
        items,
        addItem,
        getItemsByType
    }
}
