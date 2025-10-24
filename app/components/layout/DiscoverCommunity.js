import CommunityGrid from "./CommunityGrid";

export default function DiscoverCommunity() {
  return (
    <div>
      <div>
        <h2 className="text-center text-3xl md:text-4xl font-medium">
          Discover a Community for{" "}
          <span className="text-blue-500 font-serif italic font-medium font-swash text-3xl md:text-3xl lg:text-4xl tracking-tighter">
            (You)
          </span>
        </h2>
        <p className="text-center text-lg text-gray-600">
          Join a vibrant community of learners and educators who are passionate
          about sharing knowledge and growing together.
        </p>
      </div>
      <div className="communities">
        <CommunityGrid />
      </div>
    </div>
  );
}
