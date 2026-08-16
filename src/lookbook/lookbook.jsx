/**
 * LOOKBOOK COMPONENT
 * Each product is one slide.
 * Each product slide contains all of its product images
 * arranged in an editorial grid.
 */

import React, { useEffect, useState } from "react";
import { queryStorefront } from "./storefront-client";
import { LOOKBOOK_QUERY, buildProductsQuery } from "./queries";
import "./style.css";

export function Lookbook({ config }) {
    const [lookbooks, setLookbooks] = useState([]);
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                const results = [];

                for (const handle of config.handles) {
                    const lookbookData = await queryStorefront(
                        config,
                        LOOKBOOK_QUERY,
                        {
                            handle,
                            country: config.country,
                        }
                    );

                    const metaobject = lookbookData.metaobject;

                    if (!metaobject) continue;

                    const productHandles = JSON.parse(
                        metaobject.products?.value || "[]"
                    );

                    let products = [];

                    if (productHandles.length > 0) {
                        const { query, variables } =
                            buildProductsQuery(productHandles);

                        variables.country = config.country;

                        const productsData = await queryStorefront(
                            config,
                            query,
                            variables
                        );

                        products = Object.values(productsData).filter(Boolean);
                    }

                    results.push({
                        handle: metaobject.handle,
                        title: metaobject.title?.value,
                        description: metaobject.description?.value,
                        products,
                    });
                }

                if (!cancelled) {
                    setLookbooks(results);
                    setStatus("ready");
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message);
                    setStatus("error");
                }
            }
        }

        load();

        return () => {
            cancelled = true;
        };
    }, []);

    if (status === "loading") {
        return (
            <div className="lookbook lookbook--loading section section--page-width">
                <div className="lookbook__loader">
                    <svg
                        className="lookbook__spinner"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                            opacity="0.25"
                        />
                        <path
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span className="lookbook__spinner-text">
                        Loading lookbook…
                    </span>
                </div>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="lookbook lookbook--error section section--page-width">
                <div className="lookbook__loader">
                    <span style={{ fontSize: "24px" }}>⚠️</span>
                    <span className="lookbook__spinner-text">
                        Couldn't load lookbook: {error}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="lookbook section section--page-width"> 
            {lookbooks.map((lookbook) => (
                <LookbookSection
                    key={lookbook.handle}
                    lookbook={lookbook}
                />
            ))}
        </div>

    );
}


/* =========================================
   LOOKBOOK SECTION
========================================= */

function LookbookSection({ lookbook }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const products = lookbook.products || [];

    const totalSlides = products.length;

    const nextSlide = () => {
        if (totalSlides <= 1) return;

        setCurrentSlide((current) =>
            current === totalSlides - 1
                ? 0
                : current + 1
        );
    };

    const previousSlide = () => {
        if (totalSlides <= 1) return;

        setCurrentSlide((current) =>
            current === 0
                ? totalSlides - 1
                : current - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section className="lookbook__section">

            <div className="lookbook__header">
                {lookbook.title && (
                    <h2 className="lookbook__title">
                        Lookbook: {lookbook.title}
                    </h2>
                )}

                {lookbook.description && (
                    <p className="lookbook__description">
                        {lookbook.description}
                    </p>
                )}
            </div>


            {products.length > 0 && (
                <div className="lookbook__carousel">

                    {/* Slides */}
                    <div className="lookbook__slides">
                        {products.map((product, index) => (
                            <div
                                key={product.handle}
                                className={`lookbook__slide ${index === currentSlide
                                        ? "is-active"
                                        : ""
                                    }`}
                                aria-hidden={
                                    index !== currentSlide
                                }
                            >
                                <LookbookProduct
                                    product={product}
                                />
                            </div>
                        ))}
                    </div>


                    {/* Previous / Next */}
                    {totalSlides > 1 && (
                        <>
                            <button
                                type="button"
                                className="lookbook__arrow lookbook__arrow--previous slideshow-control slideshow-control--previous slideshow-control--style-arrow button button-unstyled button-unstyled--transparent flip-x"
                                onClick={previousSlide}
                                aria-label="Previous product"
                            >
                                <span class="svg-wrapper icon-arrow"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="var(--icon-stroke-width)" vector-effect="non-scaling-stroke" d="M4.25 10h11.5m0 0-4-4m4 4-4 4"></path></svg>
                                </span>
                            </button>

                            <button
                                type="button"
                                className="lookbook__arrow lookbook__arrow--next slideshow-control slideshow-control--next slideshow-control--style-arrow button button-unstyled button-unstyled--transparent"
                                onClick={nextSlide}
                                aria-label="Next product"
                            >
                                <span class="svg-wrapper icon-arrow"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="var(--icon-stroke-width)" vector-effect="non-scaling-stroke" d="M4.25 10h11.5m0 0-4-4m4 4-4 4"></path></svg>
                                </span>
                            </button>
                        </>
                    )}


                    {/* Slide indicators */}
                    {totalSlides > 1 && (
                        <div className="lookbook__pagination">
                            {products.map((product, index) => (
                                <button
                                    key={product.handle}
                                    type="button"
                                    className={`lookbook__pagination-dot ${index === currentSlide
                                            ? "is-active"
                                            : ""
                                        }`}
                                    onClick={() =>
                                        goToSlide(index)
                                    }
                                    aria-label={`Go to product ${index + 1
                                        }`}
                                    aria-current={
                                        index === currentSlide
                                            ? "true"
                                            : undefined
                                    }
                                />
                            ))}
                        </div>
                    )}

                </div>
            )}
        </section>
    );
}


/* =========================================
   PRODUCT SLIDE
========================================= */

function LookbookProduct({ product }) {
    // loop through all product images, but if there are none, fall back to the featured image. If there are no images at all, show nothing.
    const images =
        product.images?.edges?.map(
            ({ node }) => node
        ) || [];

    const productImages =
        images.length > 0
            ? images
            : product.featuredImage
                ? [product.featuredImage]
                : [];

    return (
        <div className="lookbook__product">

            {/* Image showcase */}
            <a
                href={`/products/${product.handle}`}
                className="lookbook__image-grid"
            >
                {productImages.map((image, index) => (
                    <div
                        key={image.id}
                        className={`lookbook__image lookbook__image--${(index % 6) + 1
                            }`}
                    >
                        <img
                            src={buildOptimizedImageUrl(image.url, 640)}
                            srcSet={buildImageSrcSet(image.url)}
                            sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt={
                                image.altText ||
                                product.title
                            }
                            width={image.width || 800}
                            height={image.height || 1000}
                            loading="lazy"
                            decoding="async"
                            fetchPriority="low"
                        />
                    </div>
                ))}
            </a>


            {/* Product information */}
            <div className="lookbook__product-info">

                <a
                    href={`/products/${product.handle}`}
                    className="lookbook__product-link"
                >
                    <h3 className="lookbook__product-title">
                        {product.title}
                    </h3>
                </a>

                <p className="lookbook__product-price">
                    {formatMoney(
                        product.priceRange
                            .minVariantPrice
                    )}

                    {hasDiscount(product) && (
                        <span className="lookbook__product-compare-at">
                            {formatMoney(
                                product
                                    .compareAtPriceRange
                                    .minVariantPrice
                            )}
                        </span>
                    )}
                </p>

            </div>

        </div>
    );
}


/* =========================================
   SALE CHECK
========================================= */

function hasDiscount(product) {
    const compareAt =
        product
            .compareAtPriceRange
            ?.minVariantPrice
            ?.amount;

    const price =
        product
            .priceRange
            ?.minVariantPrice
            ?.amount;

    return (
        compareAt &&
        parseFloat(compareAt) >
        parseFloat(price)
    );
}


/* =========================================
   MONEY FORMATTER based on currency code, e.g. USD, JPY, AUD
========================================= */

function formatMoney({
    amount,
    currencyCode,
}) {
    return new Intl.NumberFormat(
        undefined,
        {
            style: "currency",
            currency: currencyCode,
        }
    ).format(amount);
}

function buildOptimizedImageUrl(url, width) {
    if (!url) return url;

    const separator = url.includes("?") ? "&" : "?";

    return `${url}${separator}width=${width}`;
}

function buildImageSrcSet(url) {
    if (!url) return "";

    const widths = [320, 480, 640, 800, 960, 1200, 1600];

    return widths
        .map((width) => `${buildOptimizedImageUrl(url, width)} ${width}w`)
        .join(", ");
}

