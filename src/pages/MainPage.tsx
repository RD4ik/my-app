import React from 'react'

import Graph from '../features/graph/components/Graph'
import { useDrag } from '../features/graph/hooks/useDrag'

import mainPhoto from '../shared/assets/img/photo_2026-04-09_00-58-18.jpg'
import option from '../shared/assets/img/Vector.svg'
import './MainPage.css'

const MainPage: React.FC = () => {
  const {
    ref: asideRef,
    position: asidePosition,
    isDragging: isDraggingAside,
    handlePointerDown: handleAsidePointerDown,
    handlePointerMove: handleAsidePointerMove,
    handlePointerUp: finishAsideDrag,
    handlePointerCancel: finishAsideDragCancel,
  } = useDrag()

  return (
    <div className='main-page'>
      <nav className='main-nav'>
        <img src={mainPhoto} alt='' />
        <div className='main-nav_right'>
          <button className='programs'>Программы</button>
          <button className='create-program'>+ Создать программу</button>
        </div>
        <div className='main-nav_left'>
          <button className='notions'>Уведомления</button>
          <button className='my-programs'>Мои программы</button>
          <button className='profile'>Профиль</button>
        </div>
      </nav>

      <section className='main-body'>
        <h1 className='title'>Название</h1>

        <Graph />

        <aside
          ref={asideRef}
          className={`aside ${isDraggingAside ? 'dragging' : ''}`}
          onPointerDown={handleAsidePointerDown}
          onPointerMove={handleAsidePointerMove}
          onPointerUp={finishAsideDrag}
          onPointerCancel={finishAsideDragCancel}
          style={{ transform: `translate(${asidePosition.x}px, ${asidePosition.y}px)` }}
        >
          <div className='aside-top'>
            <input type='search' placeholder='Поиск курса' className='aside-search' id='aside-search' name='q' />
            <button type='button'>
              <img src={option} alt='' />
            </button>
          </div>
          <div className='aside-program'>
            <div className='aside-program-text'>
              <span className='program-title'>Инфа о курсе</span>
              <span className='program-subtitle'>Описание курсааааааааа ввввввввввв</span>
            </div>
            <button className='aside-program-button' type='button'>
              Перейти
            </button>
          </div>
        </aside>
      </section>
    </div>
  )
}

export default MainPage
