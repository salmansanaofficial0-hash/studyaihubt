import supabase from "./supabase";

// ============================================================================
// POSTS
// ============================================================================

/**
 * Get all posts with filtering, searching, and sorting
 */
export async function getAllPosts(
  categorySlug?: string,
  searchQuery?: string,
  sortBy: "date" | "views" = "date",
  page = 1,
  limit = 10
) {
  try {
    let query = supabase.from("posts").select(
      `
      id,
      title,
      slug,
      excerpt,
      cover_image,
      published_at,
      views,
      featured,
      categories (
        id,
        name,
        slug
      )
    `,
      { count: "exact" }
    );

    // Filter by category if provided
    if (categorySlug) {
      query = query.eq("categories.slug", categorySlug);
    }

    // Search by title or excerpt
    if (searchQuery) {
      query = query.or(
        `title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`
      );
    }

    // Sort
    if (sortBy === "views") {
      query = query.order("views", { ascending: false });
    } else {
      query = query.order("published_at", { ascending: false });
    }

    // Pagination
    const start = (page - 1) * limit;
    const end = start + limit - 1;
    query = query.range(start, end);

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      posts: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

/**
 * Get a single post by slug and increment views
 */
export async function getPostBySlug(slug: string) {
  try {
    // Fetch the post
    const { data: post, error: fetchError } = await supabase
      .from("posts")
      .select(
        `
        id,
        title,
        slug,
        excerpt,
        content,
        cover_image,
        published_at,
        author,
        views,
        featured,
        categories (
          id,
          name,
          slug
        )
      `
      )
      .eq("slug", slug)
      .single();

    if (fetchError) throw fetchError;

    // Increment views
    if (post) {
      await supabase
        .from("posts")
        .update({ views: (post.views || 0) + 1 })
        .eq("id", post.id)
        .single();
    }

    return post;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    throw error;
  }
}

/**
 * Get featured posts (limit 3)
 */
export async function getFeaturedPosts() {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id,
        title,
        slug,
        excerpt,
        cover_image,
        published_at,
        views,
        categories (
          id,
          name,
          slug
        )
      `
      )
      .eq("featured", true)
      .order("published_at", { ascending: false })
      .limit(3);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    throw error;
  }
}

/**
 * Get popular posts (limit 4)
 */
export async function getPopularPosts() {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id,
        title,
        slug,
        excerpt,
        cover_image,
        published_at,
        views,
        categories (
          id,
          name,
          slug
        )
      `
      )
      .order("views", { ascending: false })
      .limit(4);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Error fetching popular posts:", error);
    throw error;
  }
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(categorySlug: string, limit = 10) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id,
        title,
        slug,
        excerpt,
        cover_image,
        published_at,
        views,
        categories (
          id,
          name,
          slug
        )
      `
      )
      .eq("categories.slug", categorySlug)
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    throw error;
  }
}

/**
 * Search posts by query
 */
export async function searchPosts(query: string) {
  try {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id,
        title,
        slug,
        excerpt,
        cover_image,
        published_at,
        views,
        categories (
          id,
          name,
          slug
        )
      `
      )
      .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,tags.ilike.%${query}%`)
      .order("published_at", { ascending: false })
      .limit(20);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Error searching posts:", error);
    throw error;
  }
}

/**
 * Get related posts by category
 */
export async function getRelatedPosts(
  postId: string,
  categoryId: string,
  limit = 3
) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id,
        title,
        slug,
        excerpt,
        cover_image,
        published_at,
        views,
        categories (
          id,
          name,
          slug
        )
      `
      )
      .eq("category_id", categoryId)
      .neq("id", postId)
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Error fetching related posts:", error);
    throw error;
  }
}

// ============================================================================
// CATEGORIES
// ============================================================================

/**
 * Get all categories with post count
 */
export async function getAllCategories() {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select(
        `
        id,
        name,
        slug,
        description,
        icon,
        posts (count)
      `
      )
      .order("name");

    if (error) throw error;

    return (data || []).map((category: any) => ({
      ...category,
      post_count: category.posts?.length || 0,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

/**
 * Get single category by slug
 */
export async function getCategoryBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select(
        `
        id,
        name,
        slug,
        description,
        icon,
        posts (count)
      `
      )
      .eq("slug", slug)
      .single();

    if (error) throw error;

    return {
      ...data,
      post_count: data?.posts?.length || 0,
    };
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    throw error;
  }
}

// ============================================================================
// NEWSLETTER
// ============================================================================

/**
 * Subscribe email to newsletter
 */
export async function subscribeNewsletter(email: string) {
  try {
    if (!email || !email.includes("@")) {
      return {
        success: false,
        message: "Please provide a valid email address",
      };
    }

    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email, subscribed_at: new Date().toISOString() })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        // Unique constraint violation
        return {
          success: false,
          message: "This email is already subscribed",
        };
      }
      throw error;
    }

    return {
      success: true,
      message: "Successfully subscribed to newsletter!",
      data,
    };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return {
      success: false,
      message: "Failed to subscribe. Please try again.",
    };
  }
}

// ============================================================================
// CONTACT
// ============================================================================

/**
 * Submit contact form
 */
export async function submitContactForm({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    if (!name || !email || !subject || !message) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    if (!email.includes("@")) {
      return {
        success: false,
        message: "Please provide a valid email address",
      };
    }

    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        subject,
        message,
        submitted_at: new Date().toISOString(),
        status: "new",
      })
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
      data,
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      message: "Failed to send message. Please try again.",
    };
  }
}

// ============================================================================
// REACTIONS
// ============================================================================

/**
 * Get or create session ID for reaction tracking
 */
function getSessionId(): string {
  let sessionId = localStorage.getItem("study_ai_hub_session_id");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("study_ai_hub_session_id", sessionId);
  }
  return sessionId;
}

/**
 * Add reaction to a post
 */
export async function addReaction(
  postId: string,
  reaction: "helpful" | "not_helpful"
) {
  try {
    const sessionId = getSessionId();

    // Check if user already reacted to this post
    const { data: existingReaction } = await supabase
      .from("post_reactions")
      .select("id")
      .eq("post_id", postId)
      .eq("session_id", sessionId)
      .single();

    if (existingReaction) {
      return {
        success: false,
        message: "You've already reacted to this post",
      };
    }

    // Insert reaction
    const { error } = await supabase.from("post_reactions").insert({
      post_id: postId,
      reaction,
      session_id: sessionId,
      created_at: new Date().toISOString(),
    });

    if (error) throw error;

    // Get updated counts
    const counts = await getReactionCounts(postId);

    return {
      success: true,
      message: "Thanks for your feedback!",
      counts,
    };
  } catch (error) {
    console.error("Error adding reaction:", error);
    return {
      success: false,
      message: "Failed to submit reaction",
    };
  }
}

/**
 * Get reaction counts for a post
 */
export async function getReactionCounts(postId: string) {
  try {
    const { data, error } = await supabase
      .from("post_reactions")
      .select("reaction")
      .eq("post_id", postId);

    if (error) throw error;

    const reactions = data || [];
    const helpful = reactions.filter((r: any) => r.reaction === "helpful")
      .length;
    const notHelpful = reactions.filter((r: any) => r.reaction === "not_helpful")
      .length;

    return {
      helpful,
      not_helpful: notHelpful,
      total: helpful + notHelpful,
    };
  } catch (error) {
    console.error("Error fetching reaction counts:", error);
    return {
      helpful: 0,
      not_helpful: 0,
      total: 0,
    };
  }
}
