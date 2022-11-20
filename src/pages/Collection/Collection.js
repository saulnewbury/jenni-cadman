import React from 'react'
import { collections } from '../../data/collections'
import './collection.scss'
import Picker from '../../components/Picker/Picker'
import { useParams } from 'react-router-dom'

const Collection = () => {
  const { id } = useParams()
  const { imagesData, title } = collections[id - 1]

  return (
    <>
      <div className="collection">
        <div className="collection-title title indent uppercase">
          <h3 className="lg">{title}</h3>
        </div>
        <div className="collection-inner">
          <Picker imagesData={imagesData} collectionId={id} />
        </div>
      </div>
    </>
  )
}

export default Collection
