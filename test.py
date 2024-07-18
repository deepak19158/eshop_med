import Levenshtein

def find_similar_products(products, query, threshold=0.6):
    similar_products = []
    for product in products:
        similarity = Levenshtein.ratio(product.lower(), query.lower())
        if similarity >= threshold:
            similar_products.append(product)
    return similar_products

# Example usage:
product_array = ["apple", "apples", "orange", "app", "watermelon"]
query = "apples"

similar_products = find_similar_products(product_array, query)
print("Similar products:", similar_products)
