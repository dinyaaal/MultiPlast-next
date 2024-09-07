import Image from 'next/image'
import React from 'react'

export default function Forum() {
  return (
    <>
    <div className="breadcrumbs">
					<div className="breadcrumbs__container">
						<div className="breadcrumbs__body">
							<a href="#" className="breadcrumbs__arrow">
                                <Image src="/icons/arrow-back.svg" alt="Icon" width={100} height={100} />
							</a>
							<div className="breadcrumbs__content">
								<span className="breadcrumbs__current">Головна {'>'} Форум</span>
							</div>
						</div>
					</div>
				</div>
				<section className="forum">
					<div className="forum__top top-forum">
						<div className="top-forum__container">
							
							<div className="top-forum__title title">Форум</div>
							<div className="top-forum__block">
								<select name="form[]" data-scroll="130" data-class-modif="input">
									<option value="" data-class="select__placeholder" selected>Мої теми</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
								</select>
								<div className="top-forum__search search">
									<input autoComplete="off" type="text" placeholder="Пошук по форуму" class="search__input">
									<button className="search__icon-body">
										<div className="search__icon">
											<img src="img/icons/search.svg" alt="Icon">
										</div>
									</button>
		
								</div>
							</div>
						</div>
					</div>
					<div className="forum__sections sections-forum">
						<div className="sections-forum__container">
							
							<p className="sections-forum__text">Виберіть розділ форуму:</p>
							<div className="sections-forum__body">
								<div className="sections-forum__slider swiper">
									<div className="sections-forum__wrapper swiper-wrapper">
										<div className="sections-forum__slide swiper-slide">
											<div className="sections-forum__item item-sections-forum">
												<div className="item-sections-forum__title">Полікарбонат</div>
												<p className="item-sections-forum__text">Обговорюємо полікарбонат та його види</p>
											</div>
										</div>
										<div className="sections-forum__slide swiper-slide">
											<div className="sections-forum__item item-sections-forum">
												<div className="item-sections-forum__title">Пігменти та аддитиви</div>
												<p className="item-sections-forum__text">Підвищуємо властивості пласмас завдяки додаванню примесей</p>
											</div>
										</div>
										<div className="sections-forum__slide swiper-slide">
											<div className="sections-forum__item item-sections-forum">
												<div className="item-sections-forum__title">Клеи, полімерні покриття (лакофарба) та друк</div>
												<p className="item-sections-forum__text">Обговорюємо направлення полімерної науки і техніки, повʼязані з клеями і тд</p>
											</div>
										</div>
										<div className="sections-forum__slide swiper-slide">
											<div className="sections-forum__item item-sections-forum">
												<div className="item-sections-forum__title">Лиття під тиском</div>
												<p className="item-sections-forum__text">Головний метод виробництва штучних виробів з пласмас</p>
											</div>
										</div>
										<div className="sections-forum__slide swiper-slide">
											<div className="sections-forum__item item-sections-forum">
												<div className="item-sections-forum__title">Композити</div>
												<p className="item-sections-forum__text">Спілкуємось про композиційні матеріали</p>
											</div>
										</div>
										
									</div>
									<div className="sections-forum__pagination swiper-pagination"></div>
									<button type="button" className="sections-forum__prev swiper-button swiper-button-prev">
										<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect x="0.5" y="0.5" width="40" height="40" rx="3.5" fill="#1858B8" stroke="#1858B8"/>
											<path d="M24.5303 21.5303C24.8232 21.2374 24.8232 20.7626 24.5303 20.4697L19.7574 15.6967C19.4645 15.4038 18.9896 15.4038 18.6967 15.6967C18.4038 15.9896 18.4038 16.4645 18.6967 16.7574L22.9393 21L18.6967 25.2426C18.4038 25.5355 18.4038 26.0104 18.6967 26.3033C18.9896 26.5962 19.4645 26.5962 19.7574 26.3033L24.5303 21.5303ZM24 20.25H23V21.75H24V20.25Z" fill="white"/>
										</svg>
									</button>
									<button type="button" className="sections-forum__next swiper-button swiper-button-next">
										<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect x="0.5" y="0.5" width="40" height="40" rx="3.5" fill="#1858B8" stroke="#1858B8"/>
											<path d="M24.5303 21.5303C24.8232 21.2374 24.8232 20.7626 24.5303 20.4697L19.7574 15.6967C19.4645 15.4038 18.9896 15.4038 18.6967 15.6967C18.4038 15.9896 18.4038 16.4645 18.6967 16.7574L22.9393 21L18.6967 25.2426C18.4038 25.5355 18.4038 26.0104 18.6967 26.3033C18.9896 26.5962 19.4645 26.5962 19.7574 26.3033L24.5303 21.5303ZM24 20.25H23V21.75H24V20.25Z" fill="white"/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="forum__body body-forum body-forum--delete">
						<div className="body-forum__container">
							
							<p className="body-forum__text">
								Виберіть тему форуму:
							</p>
							<div className="body-forum__content">
								<div className="body-forum__items">
									<div className="body-forum__item item-forum">
										<button className="item-forum__delete">
											<img src="@img/icons/bin.svg" alt="Icon">
										</button>
										<div className="item-forum__body">
	
											<div className="item-forum__block">
												<h4 className="item-forum__title">Ключові властивості полікарбонату</h4>
												<p className="item-forum__text">Ключовими властивостями полікарбонату є висока прозорість, відносно мала вага та дуже висока ударна в'язкість (удароміцність). Полікарбонат є полімерним пластиковим матеріалом, який можна використовувати по-різному. Завдяки фізичним властивостям полікарбонату цей матеріал широко використовується у будівництві та архітектурі. Ми можемо використовувати ... </p>
											</div>
											<div className="item-forum__block">
												<div className="item-forum__info info-item-forum">
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/watch.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">8</span>
													</div>
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/comments.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">4</span>
													</div>
												</div>
												<a href="#" className="item-forum__more">
													<span>Читати</span>
													<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0.46967 16.0263C0.176777 16.3192 0.176777 16.7941 0.46967 17.087C0.762563 17.3799 1.23744 17.3799 1.53033 17.087L0.46967 16.0263ZM16.75 1.55664C16.75 1.14243 16.4142 0.806641 16 0.806641L9.25 0.806641C8.83579 0.806641 8.5 1.14243 8.5 1.55664C8.5 1.97085 8.83579 2.30664 9.25 2.30664L15.25 2.30664L15.25 8.30664C15.25 8.72085 15.5858 9.05664 16 9.05664C16.4142 9.05664 16.75 8.72085 16.75 8.30664L16.75 1.55664ZM1.53033 17.087L16.5303 2.08697L15.4697 1.02631L0.46967 16.0263L1.53033 17.087Z" fill="#1858B8"/>
													</svg>	
												</a>
											</div>
										</div>
									</div>
									<div className="body-forum__item item-forum">
										<button className="item-forum__delete">
											<img src="@img/icons/bin.svg" alt="Icon">
										</button>
										<div className="item-forum__body">
	
											<div className="item-forum__block">
												<h4 className="item-forum__title">Ключові властивості полікарбонату</h4>
												<p className="item-forum__text">Ключовими властивостями полікарбонату є висока прозорість, відносно мала вага та дуже висока ударна в'язкість (удароміцність). Полікарбонат є полімерним пластиковим матеріалом, який можна використовувати по-різному. Завдяки фізичним властивостям полікарбонату цей матеріал широко використовується у будівництві та архітектурі. Ми можемо використовувати ... </p>
											</div>
											<div className="item-forum__block">
												<div className="item-forum__info info-item-forum">
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/watch.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">8</span>
													</div>
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/comments.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">4</span>
													</div>
												</div>
												<a href="#" className="item-forum__more">
													<span>Читати</span>
													<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0.46967 16.0263C0.176777 16.3192 0.176777 16.7941 0.46967 17.087C0.762563 17.3799 1.23744 17.3799 1.53033 17.087L0.46967 16.0263ZM16.75 1.55664C16.75 1.14243 16.4142 0.806641 16 0.806641L9.25 0.806641C8.83579 0.806641 8.5 1.14243 8.5 1.55664C8.5 1.97085 8.83579 2.30664 9.25 2.30664L15.25 2.30664L15.25 8.30664C15.25 8.72085 15.5858 9.05664 16 9.05664C16.4142 9.05664 16.75 8.72085 16.75 8.30664L16.75 1.55664ZM1.53033 17.087L16.5303 2.08697L15.4697 1.02631L0.46967 16.0263L1.53033 17.087Z" fill="#1858B8"/>
													</svg>	
												</a>
											</div>
										</div>
									</div>
									<div className="body-forum__item item-forum">
										<button className="item-forum__delete">
											<img src="@img/icons/bin.svg" alt="Icon">
										</button>
										<div className="item-forum__body">
	
											<div className="item-forum__block">
												<h4 className="item-forum__title">Ключові властивості полікарбонату</h4>
												<p className="item-forum__text">Ключовими властивостями полікарбонату є висока прозорість, відносно мала вага та дуже висока ударна в'язкість (удароміцність). Полікарбонат є полімерним пластиковим матеріалом, який можна використовувати по-різному. Завдяки фізичним властивостям полікарбонату цей матеріал широко використовується у будівництві та архітектурі. Ми можемо використовувати ... </p>
											</div>
											<div className="item-forum__block">
												<div className="item-forum__info info-item-forum">
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/watch.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">8</span>
													</div>
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/comments.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">4</span>
													</div>
												</div>
												<a href="#" className="item-forum__more">
													<span>Читати</span>
													<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0.46967 16.0263C0.176777 16.3192 0.176777 16.7941 0.46967 17.087C0.762563 17.3799 1.23744 17.3799 1.53033 17.087L0.46967 16.0263ZM16.75 1.55664C16.75 1.14243 16.4142 0.806641 16 0.806641L9.25 0.806641C8.83579 0.806641 8.5 1.14243 8.5 1.55664C8.5 1.97085 8.83579 2.30664 9.25 2.30664L15.25 2.30664L15.25 8.30664C15.25 8.72085 15.5858 9.05664 16 9.05664C16.4142 9.05664 16.75 8.72085 16.75 8.30664L16.75 1.55664ZM1.53033 17.087L16.5303 2.08697L15.4697 1.02631L0.46967 16.0263L1.53033 17.087Z" fill="#1858B8"/>
													</svg>	
												</a>
											</div>
										</div>
									</div>
									<div className="body-forum__item item-forum">
										<button className="item-forum__delete">
											<img src="@img/icons/bin.svg" alt="Icon">
										</button>
										<div className="item-forum__body">
	
											<div className="item-forum__block">
												<h4 className="item-forum__title">Ключові властивості полікарбонату</h4>
												<p className="item-forum__text">Ключовими властивостями полікарбонату є висока прозорість, відносно мала вага та дуже висока ударна в'язкість (удароміцність). Полікарбонат є полімерним пластиковим матеріалом, який можна використовувати по-різному. Завдяки фізичним властивостям полікарбонату цей матеріал широко використовується у будівництві та архітектурі. Ми можемо використовувати ... </p>
											</div>
											<div className="item-forum__block">
												<div className="item-forum__info info-item-forum">
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/watch.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">8</span>
													</div>
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/comments.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">4</span>
													</div>
												</div>
												<a href="#" className="item-forum__more">
													<span>Читати</span>
													<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0.46967 16.0263C0.176777 16.3192 0.176777 16.7941 0.46967 17.087C0.762563 17.3799 1.23744 17.3799 1.53033 17.087L0.46967 16.0263ZM16.75 1.55664C16.75 1.14243 16.4142 0.806641 16 0.806641L9.25 0.806641C8.83579 0.806641 8.5 1.14243 8.5 1.55664C8.5 1.97085 8.83579 2.30664 9.25 2.30664L15.25 2.30664L15.25 8.30664C15.25 8.72085 15.5858 9.05664 16 9.05664C16.4142 9.05664 16.75 8.72085 16.75 8.30664L16.75 1.55664ZM1.53033 17.087L16.5303 2.08697L15.4697 1.02631L0.46967 16.0263L1.53033 17.087Z" fill="#1858B8"/>
													</svg>	
												</a>
											</div>
										</div>
									</div>
									<div className="body-forum__item item-forum">
										<button className="item-forum__delete">
											<img src="@img/icons/bin.svg" alt="Icon">
										</button>
										<div className="item-forum__body">
	
											<div className="item-forum__block">
												<h4 className="item-forum__title">Ключові властивості полікарбонату</h4>
												<p className="item-forum__text">Ключовими властивостями полікарбонату є висока прозорість, відносно мала вага та дуже висока ударна в'язкість (удароміцність). Полікарбонат є полімерним пластиковим матеріалом, який можна використовувати по-різному. Завдяки фізичним властивостям полікарбонату цей матеріал широко використовується у будівництві та архітектурі. Ми можемо використовувати ... </p>
											</div>
											<div className="item-forum__block">
												<div className="item-forum__info info-item-forum">
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/watch.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">8</span>
													</div>
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/comments.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">4</span>
													</div>
												</div>
												<a href="#" className="item-forum__more">
													<span>Читати</span>
													<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0.46967 16.0263C0.176777 16.3192 0.176777 16.7941 0.46967 17.087C0.762563 17.3799 1.23744 17.3799 1.53033 17.087L0.46967 16.0263ZM16.75 1.55664C16.75 1.14243 16.4142 0.806641 16 0.806641L9.25 0.806641C8.83579 0.806641 8.5 1.14243 8.5 1.55664C8.5 1.97085 8.83579 2.30664 9.25 2.30664L15.25 2.30664L15.25 8.30664C15.25 8.72085 15.5858 9.05664 16 9.05664C16.4142 9.05664 16.75 8.72085 16.75 8.30664L16.75 1.55664ZM1.53033 17.087L16.5303 2.08697L15.4697 1.02631L0.46967 16.0263L1.53033 17.087Z" fill="#1858B8"/>
													</svg>	
												</a>
											</div>
										</div>
									</div>
									<div className="body-forum__item item-forum">
										<button className="item-forum__delete">
											<img src="@img/icons/bin.svg" alt="Icon">
										</button>
										<div className="item-forum__body">
	
											<div className="item-forum__block">
												<h4 className="item-forum__title">Ключові властивості полікарбонату</h4>
												<p className="item-forum__text">Ключовими властивостями полікарбонату є висока прозорість, відносно мала вага та дуже висока ударна в'язкість (удароміцність). Полікарбонат є полімерним пластиковим матеріалом, який можна використовувати по-різному. Завдяки фізичним властивостям полікарбонату цей матеріал широко використовується у будівництві та архітектурі. Ми можемо використовувати ... </p>
											</div>
											<div className="item-forum__block">
												<div className="item-forum__info info-item-forum">
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/watch.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">8</span>
													</div>
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/comments.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">4</span>
													</div>
												</div>
												<a href="#" className="item-forum__more">
													<span>Читати</span>
													<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0.46967 16.0263C0.176777 16.3192 0.176777 16.7941 0.46967 17.087C0.762563 17.3799 1.23744 17.3799 1.53033 17.087L0.46967 16.0263ZM16.75 1.55664C16.75 1.14243 16.4142 0.806641 16 0.806641L9.25 0.806641C8.83579 0.806641 8.5 1.14243 8.5 1.55664C8.5 1.97085 8.83579 2.30664 9.25 2.30664L15.25 2.30664L15.25 8.30664C15.25 8.72085 15.5858 9.05664 16 9.05664C16.4142 9.05664 16.75 8.72085 16.75 8.30664L16.75 1.55664ZM1.53033 17.087L16.5303 2.08697L15.4697 1.02631L0.46967 16.0263L1.53033 17.087Z" fill="#1858B8"/>
													</svg>	
												</a>
											</div>
										</div>
									</div>
									<div className="body-forum__item item-forum">
										<button className="item-forum__delete">
											<img src="@img/icons/bin.svg" alt="Icon">
										</button>
										<div className="item-forum__body">
	
											<div className="item-forum__block">
												<h4 className="item-forum__title">Ключові властивості полікарбонату</h4>
												<p className="item-forum__text">Ключовими властивостями полікарбонату є висока прозорість, відносно мала вага та дуже висока ударна в'язкість (удароміцність). Полікарбонат є полімерним пластиковим матеріалом, який можна використовувати по-різному. Завдяки фізичним властивостям полікарбонату цей матеріал широко використовується у будівництві та архітектурі. Ми можемо використовувати ... </p>
											</div>
											<div className="item-forum__block">
												<div className="item-forum__info info-item-forum">
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/watch.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">8</span>
													</div>
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/comments.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">4</span>
													</div>
												</div>
												<a href="#" className="item-forum__more">
													<span>Читати</span>
													<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0.46967 16.0263C0.176777 16.3192 0.176777 16.7941 0.46967 17.087C0.762563 17.3799 1.23744 17.3799 1.53033 17.087L0.46967 16.0263ZM16.75 1.55664C16.75 1.14243 16.4142 0.806641 16 0.806641L9.25 0.806641C8.83579 0.806641 8.5 1.14243 8.5 1.55664C8.5 1.97085 8.83579 2.30664 9.25 2.30664L15.25 2.30664L15.25 8.30664C15.25 8.72085 15.5858 9.05664 16 9.05664C16.4142 9.05664 16.75 8.72085 16.75 8.30664L16.75 1.55664ZM1.53033 17.087L16.5303 2.08697L15.4697 1.02631L0.46967 16.0263L1.53033 17.087Z" fill="#1858B8"/>
													</svg>	
												</a>
											</div>
										</div>
									</div>
									<div className="body-forum__item item-forum">
										<button className="item-forum__delete">
											<img src="@img/icons/bin.svg" alt="Icon">
										</button>
										<div className="item-forum__body">
	
											<div className="item-forum__block">
												<h4 className="item-forum__title">Ключові властивості полікарбонату</h4>
												<p className="item-forum__text">Ключовими властивостями полікарбонату є висока прозорість, відносно мала вага та дуже висока ударна в'язкість (удароміцність). Полікарбонат є полімерним пластиковим матеріалом, який можна використовувати по-різному. Завдяки фізичним властивостям полікарбонату цей матеріал широко використовується у будівництві та архітектурі. Ми можемо використовувати ... </p>
											</div>
											<div className="item-forum__block">
												<div className="item-forum__info info-item-forum">
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/watch.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">8</span>
													</div>
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/comments.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">4</span>
													</div>
												</div>
												<a href="#" className="item-forum__more">
													<span>Читати</span>
													<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0.46967 16.0263C0.176777 16.3192 0.176777 16.7941 0.46967 17.087C0.762563 17.3799 1.23744 17.3799 1.53033 17.087L0.46967 16.0263ZM16.75 1.55664C16.75 1.14243 16.4142 0.806641 16 0.806641L9.25 0.806641C8.83579 0.806641 8.5 1.14243 8.5 1.55664C8.5 1.97085 8.83579 2.30664 9.25 2.30664L15.25 2.30664L15.25 8.30664C15.25 8.72085 15.5858 9.05664 16 9.05664C16.4142 9.05664 16.75 8.72085 16.75 8.30664L16.75 1.55664ZM1.53033 17.087L16.5303 2.08697L15.4697 1.02631L0.46967 16.0263L1.53033 17.087Z" fill="#1858B8"/>
													</svg>	
												</a>
											</div>
										</div>
									</div>
									<div className="body-forum__item item-forum">
										<button className="item-forum__delete">
											<img src="@img/icons/bin.svg" alt="Icon">
										</button>
										<div className="item-forum__body">
	
											<div className="item-forum__block">
												<h4 className="item-forum__title">Ключові властивості полікарбонату</h4>
												<p className="item-forum__text">Ключовими властивостями полікарбонату є висока прозорість, відносно мала вага та дуже висока ударна в'язкість (удароміцність). Полікарбонат є полімерним пластиковим матеріалом, який можна використовувати по-різному. Завдяки фізичним властивостям полікарбонату цей матеріал широко використовується у будівництві та архітектурі. Ми можемо використовувати ... </p>
											</div>
											<div className="item-forum__block">
												<div className="item-forum__info info-item-forum">
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/watch.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">8</span>
													</div>
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/comments.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">4</span>
													</div>
												</div>
												<a href="#" className="item-forum__more">
													<span>Читати</span>
													<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0.46967 16.0263C0.176777 16.3192 0.176777 16.7941 0.46967 17.087C0.762563 17.3799 1.23744 17.3799 1.53033 17.087L0.46967 16.0263ZM16.75 1.55664C16.75 1.14243 16.4142 0.806641 16 0.806641L9.25 0.806641C8.83579 0.806641 8.5 1.14243 8.5 1.55664C8.5 1.97085 8.83579 2.30664 9.25 2.30664L15.25 2.30664L15.25 8.30664C15.25 8.72085 15.5858 9.05664 16 9.05664C16.4142 9.05664 16.75 8.72085 16.75 8.30664L16.75 1.55664ZM1.53033 17.087L16.5303 2.08697L15.4697 1.02631L0.46967 16.0263L1.53033 17.087Z" fill="#1858B8"/>
													</svg>	
												</a>
											</div>
										</div>
									</div>
									<div className="body-forum__item item-forum">
										<button className="item-forum__delete">
											<img src="@img/icons/bin.svg" alt="Icon">
										</button>
										<div className="item-forum__body">
	
											<div className="item-forum__block">
												<h4 className="item-forum__title">Ключові властивості полікарбонату</h4>
												<p className="item-forum__text">Ключовими властивостями полікарбонату є висока прозорість, відносно мала вага та дуже висока ударна в'язкість (удароміцність). Полікарбонат є полімерним пластиковим матеріалом, який можна використовувати по-різному. Завдяки фізичним властивостям полікарбонату цей матеріал широко використовується у будівництві та архітектурі. Ми можемо використовувати ... </p>
											</div>
											<div className="item-forum__block">
												<div className="item-forum__info info-item-forum">
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/watch.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">8</span>
													</div>
													<div className="info-item-forum__item">
														<div className="info-item-forum__icon">
															<img src="@img/icons/comments.svg" alt="Icon">
														</div>
														<span className="info-item-forum__value">4</span>
													</div>
												</div>
												<a href="#" className="item-forum__more">
													<span>Читати</span>
													<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0.46967 16.0263C0.176777 16.3192 0.176777 16.7941 0.46967 17.087C0.762563 17.3799 1.23744 17.3799 1.53033 17.087L0.46967 16.0263ZM16.75 1.55664C16.75 1.14243 16.4142 0.806641 16 0.806641L9.25 0.806641C8.83579 0.806641 8.5 1.14243 8.5 1.55664C8.5 1.97085 8.83579 2.30664 9.25 2.30664L15.25 2.30664L15.25 8.30664C15.25 8.72085 15.5858 9.05664 16 9.05664C16.4142 9.05664 16.75 8.72085 16.75 8.30664L16.75 1.55664ZM1.53033 17.087L16.5303 2.08697L15.4697 1.02631L0.46967 16.0263L1.53033 17.087Z" fill="#1858B8"/>
													</svg>	
												</a>
											</div>
										</div>
									</div>
								</div>
								<div className="body-forum__pages pages">
									<button className="pages__arrow pages__arrow-prev disabled">
										<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect x="0.5" y="0.5" width="40" height="40" rx="3.5" fill="#1858B8" stroke="#1858B8"></rect>
											<path d="M24.5303 21.5303C24.8232 21.2374 24.8232 20.7626 24.5303 20.4697L19.7574 15.6967C19.4645 15.4038 18.9896 15.4038 18.6967 15.6967C18.4038 15.9896 18.4038 16.4645 18.6967 16.7574L22.9393 21L18.6967 25.2426C18.4038 25.5355 18.4038 26.0104 18.6967 26.3033C18.9896 26.5962 19.4645 26.5962 19.7574 26.3033L24.5303 21.5303ZM24 20.25H23V21.75H24V20.25Z" fill="white"></path>
										</svg>
									</button>
									<div className="pages__body">
										<div className="pages__page active">1</div>
										<div className="pages__page">2</div>
										<div className="pages__page">...</div>
										<div className="pages__page">25</div>
									</div>
									<button className="pages__arrow pages__arrow-next">
										<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect x="0.5" y="0.5" width="40" height="40" rx="3.5" fill="#1858B8" stroke="#1858B8"></rect>
											<path d="M24.5303 21.5303C24.8232 21.2374 24.8232 20.7626 24.5303 20.4697L19.7574 15.6967C19.4645 15.4038 18.9896 15.4038 18.6967 15.6967C18.4038 15.9896 18.4038 16.4645 18.6967 16.7574L22.9393 21L18.6967 25.2426C18.4038 25.5355 18.4038 26.0104 18.6967 26.3033C18.9896 26.5962 19.4645 26.5962 19.7574 26.3033L24.5303 21.5303ZM24 20.25H23V21.75H24V20.25Z" fill="white"></path>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
					
				</section>
    </>
  )
}
