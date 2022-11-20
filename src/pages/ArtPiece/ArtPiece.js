import React from 'react'
import './artpiece.scss'
import { useParams } from 'react-router-dom'
import { collections } from '../../data/collections'
import Picker from '../../components/Picker/Picker'

import './artpiece.scss'

const ArtPiece = () => {
  const { slug, id } = useParams()

  // get collection which includes a title that is the same as slug.
  const cln = collections.filter(cln => {
    return cln.imagesData?.images.some(
      obj => obj.title.toLowerCase() === slug.replace(/-/g, ' ')
    )
  })
  console.log(cln)

  const obj = cln[0].imagesData?.images.filter(
    obj => obj.title.toLowerCase() === slug.replace(/-/g, ' ')
  )

  const { subFolder, imagesData } = cln[0]
  const { id: artpieceId, title, image, detail, altText, desc } = obj[0]

  return (
    <div className="art-piece indent">
      <div className="main-image">
        <div className="main-image-inner">
          <div className="image">
            <img src={`../images/${subFolder}/${image}.jpg`} alt={altText} />
          </div>
          <div className="info">
            <div className="info-inner">
              <h1 className="title uppercase sm">{title}</h1>
              <p className="collection-date">{desc.year}</p>
              <p className="medium">{desc.medium}</p>
              <p className="size">{desc.size}</p>
              {desc.mount && <p className="mount">{desc.mount}</p>}
              <p className="price">{desc.price}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="detail">
        <div className="detail-inner">
          <div className="spacer"></div>
          <div className="detail-content">
            <div className="image">
              <div className="image-inner">
                <h4>(Detail)</h4>
                <img
                  src={`../images/${subFolder}/${image}-${detail}.jpg`}
                  alt={altText}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Picker imagesData={imagesData} collectionId={id} />
    </div>
  )
}

export default ArtPiece
